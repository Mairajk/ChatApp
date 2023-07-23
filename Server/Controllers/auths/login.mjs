
import jwt from 'jsonwebtoken';
import { varifyHash } from 'bcrypt-inzi';

/** import models */
import UserModel from '../../db/models/UserModel.mjs';

/** @description: This is Login controller. */
export default async (req, res) => {

    const SECRET = process.env.SECRET || 'secuirity';

    try {
        const { body: { password } } = req;
        let { body: { email } } = req;
        email = email.toLowerCase();

        if (!password || !email) {
            res.status(400).send({
                message: 'some thing is missing in required fields ',
                example: `here is a request example :
                     {
                        email: "abc@123.com",
                        password: "*******"
                     } `,
            });
        }

        const user = await UserModel.findOne({ email }, 'email password firstName lastName');

        if (!user) {
            res.status(404).send({
                message: 'User with this email doest not exist!'
            });
        }

        const isMatch = await varifyHash(password, user.password);

        console.log('isMatch ===>', isMatch);

        if (!isMatch) {
            res.status(403).send({
                message: 'Incorrect password!'
            });
        }

        const token = await jwt.sign(
            {
                id: user._id,
                email: email,
                iat: Math.floor(Date.now() / 1000) - 30,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
            },
            SECRET
        );

        console.log('token ===> ', token);

        res.cookie('Token', token, {
            maxAge: 86_400_000,
            httpOnly: true,
        });

        res.json({
            message: 'log in successfull.',
            userProfile: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                _id: user._id,
            },
        });

    } catch (error) {
        console.log('server error ===>', error);
        res.status(500).send({
            message: 'login failed, please try again later',
        });
    }
};