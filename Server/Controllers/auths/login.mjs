
/** @description: This is Login controller. */

export default (req, res) => {
    let body = req.body;
    body.email = body.email.toLowerCase();

    if (!body.password || !body.email) {
        res.status(400).send({
            message: `some thing is missing in required fields `,
            example: `here is a request example :
                 {
                    email: "abc@123.com",
                    password: "*******"
                 } `,
        });
        return;
    }

    UserModel.findOne(
        { email: body.email },
        "email password firstName lastName",
        (err, user) => {
            if (!err) {
                console.log("user ===> ", user);

                if (user) {
                    varifyHash(body.password, user.password).then((isMatch) => {
                        console.log("isMatch ===>", isMatch);
                        if (isMatch) {
                            const token = jwt.sign(
                                {
                                    id: user._id,
                                    email: body.email,
                                    iat: Math.floor(Date.now() / 1000) - 30,
                                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
                                },
                                SECRET
                            );

                            console.log("token ===> ", token);

                            res.cookie("Token", token, {
                                maxAge: 86_400_000,
                                httpOnly: true,
                            });

                            res.send({
                                message: "logedin successfully",
                                userProfile: {
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    email: user.email,
                                    _id: user._id,
                                },
                            });
                            return;
                        } else {
                            console.log("password did not match");
                            res.status(401).send({
                                message: "wrong password",
                            });
                            return;
                        }
                    });
                } else {
                    console.log("user not found");

                    res.status(401).send({
                        message: "incorrect email user does not exist",
                    });
                    return;
                }
            } else {
                console.log("server error ===>", err);
                res.status(500).send({
                    message: "login failed, please try again later",
                });
                return;
            }
        }
    );
}