
import { customAlphabet } from 'nanoid';
import { stringToHash } from 'bcrypt-inzi';



/** import models */
import OtpModel from '../../db/models/OtpModel.mjs';
import UserModel from '../../db/models/UserModel.mjs';

export default async (req, res) => {
    try {
        const body = req.body;
        const email = body.email;

        if (!email) {
            res.status(400).send({
                message: 'email is required',
            });

            return;
        }

        const user = await UserModel.findOne({ email: email }, 'firstName lastName email');

        if (!user) {
            res.status(404).send({
                message: 'incorrect email! user not found'
            });

        }
        const nanoid = await customAlphabet('1234567890', 5);
        const OTP = await nanoid();
        const otpHash = await stringToHash(OTP);

        console.log('OTP: ', OTP);
        console.log('otpHash: ', otpHash);

        await OtpModel.create({
            otp: otpHash,
            email: body.email, // malik@sysborg.com
        });

    } catch (err) {
        console.log('err ===>', err);
        res.status(500).send(err);
    }
};