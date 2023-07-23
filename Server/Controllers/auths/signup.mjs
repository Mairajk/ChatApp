
import { stringToHash } from 'bcrypt-inzi';

/** import models */
import UserModel from '../../db/models/UserModel.mjs';


/** @description: This is Signup controller. */
export default async (req, res) => {
    try {

        const { body: { email, password, } } = req;

        if (!email || !password) {
            res.status(422).send({
                message: `required fields missing, example request : 
                    {
                        firstName : 'Mairaj',
                        lastName : 'Khan',
                        email : 'abc@123.com',
                        password : '*******'
                    }`,
            });
        }

        const user = await UserModel.findOne({ email });

        if (user) {
            console.log('user ===> ', user);
            console.log('user exist already ===>', user);

            res.status(400).send({
                message: 'this email is already exist please try a different one.',
            });
        }

        const hashedPassword = await stringToHash(password);


        await UserModel.create({ email, password: hashedPassword });

        res.json({
            message: 'user created successfully',
        });


    } catch (error) {
        console.log('error ===> ', error);

        res.status(500).send({
            message: 'server error',
            error: error,
        });
    }
};