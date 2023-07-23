
/** @description: This is Signup controller. */

export default (req, res) => {
    let body = req.body;

    if (!body.firstName || !body.lastName || !body.email || !body.password) {
        res.status(400).send({
            message: `required fields missing, example request : 
                {
                    firstName : 'Mairaj',
                    lastName : 'Khan',
                    email : 'abc@123.com',
                    password : '*******'
                }`,
        });
        return;
    }

    req.body.email = req.body.email.toLowerCase();

    UserModel.findOne({ email: body.email }, (err, user) => {
        if (!err) {
            console.log("user ===> ", user);

            if (user) {
                console.log("user exist already ===>", user);

                res.status(400).send({
                    message: "this email is already exist please try a different one.",
                });
                return;
            } else {
                stringToHash(body.password).then((hashedPassword) => {
                    UserModel.create(
                        {
                            firstName: body.firstName,
                            lastName: body.lastName,
                            email: body.email,
                            password: hashedPassword,
                        },
                        (err, user) => {
                            if (!err) {
                                console.log("user created ==> ", user);

                                res.status(201).send({
                                    message: "user created successfully",
                                    data: user,
                                });
                            } else {
                                console.log("server error: ", err);
                                res.status(500).send({
                                    message: "server error",
                                    error: err,
                                });
                            }
                        }
                    );
                });
            }
        } else {
            console.log("error ===> ", err);
            res.status(500).send({
                message: "server error",
                error: err,
            });
            return;
        }
    });
}