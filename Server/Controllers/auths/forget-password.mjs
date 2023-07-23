export default async (req, res) => {
    try {
        const body = req.body;
        const email = body.email;

        if (!email) {
            res.status(400).send({
                message: "email is required",
            });
            return;
        }

        const user = await UserModel
            .findOne({ email: email }, "firstName lastName email")
            .exec();

        if (!user) throw new Error("incorrect email ! user not found");

        const nanoid = customAlphabet("1234567890", 5);
        const OTP = nanoid();
        const otpHash = await stringToHash(OTP);

        console.log("OTP: ", OTP);
        console.log("otpHash: ", otpHash);

        otpModel.create({
            otp: otpHash,
            email: body.email, // malik@sysborg.com
        });
    } catch (err) {
        console.log("err ===>", err);
        res.status(500).send(err);
    }
}