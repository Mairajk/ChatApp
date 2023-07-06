import express from "express";
import UserModel from "../db/models/UserModel.mjs";
import { stringToHash, varifyHash } from "bcrypt-inzi";
import jwt from "jsonwebtoken";

const router = express.Router();

//////////////////  SIGNUP API ////////////////////////////////////

router.post("/signup", (req, res) => {
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
});
//////////////////////////////////////////////////////////////////

//////////////////  LOGIN API ////////////////////////////////////

router.post("/login", (req, res) => {
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
});
///////////////////////////////////////////////////////////////////

//////////////////  LOGOUT API ////////////////////////////////////

router.post("/logout", (req, res) => {
  res.cookie("Token", "", {
    maxAge: 1,
    httpOnly: true,
  });

  res.send({
    message: "Logout successfully",
  });
});
///////////////////////////////////////////////////////////////////

//////////////////  find user for forget password API ////////////////////////////////////

router.post("/forget-password/find-account", async (req, res) => {
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
});
///////////////////////////////////////////////////////////////////

///////////////////////////*******************////////////////////////////////////////

export default router;
