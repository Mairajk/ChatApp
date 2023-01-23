////===============>> starting  <<=============\\\\

import express from "express";
import cors from "cors";
import path from "path";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { stringToHash, varifyHash } from "bcrypt-inzi";
import mongoose from "mongoose";
import multer from "multer";
import bucket from "./firebase/index.mjs";
import fs from "fs";
// import { type } from "os";
// import { fileURLToPath } from "url";

const SECRET = process.env.SECRET || "secuirity";

const app = express();

const port = process.env.PORT || 5001;

// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    credentials: true,
  })
);

app.use("/api/v1", (req, res, next) => {
  console.log("req.cookies: ", req.cookies);

  if (!req?.cookies?.Token) {
    res.status(401).send({
      message: "include http-only credentials with every request",
    });
    return;
  }

  jwt.verify(req.cookies.Token, SECRET, (err, decodedData) => {
    if (!err) {
      console.log("decodedData: ", decodedData);

      const nowDate = new Date().getTime() / 1000;

      if (decodedData.exp < nowDate) {
        res.status(401);
        res.cookie("Token", "", {
          maxAge: 1,
          httpOnly: true,
        });
        res.send({ message: "token expired" });
      } else {
        console.log("token approved");

        req.body.token = decodedData;
        next();
      }
    } else {
      res.status(401).send("invalid token");
    }
  });
});

///////////////////////////////////////////////////////////////////////////////

///////////////////////////// update-password API //////////////////////////////////////

app.post("/api/v1/update-password", async (req, res) => {
  try {
    const body = req.body;
    const currentPassword = body.currentPassword;
    const newPassword = body.newPassword;
    // const confirmPassword = body.confirmPassword;
    const _id = req.body.token.id;

    const user = await userModel.findOne({ _id: _id }, "password").exec();

    if (!user) throw new Error("User not found");

    const isMatch = await varifyHash(currentPassword, user.password);
    if (!isMatch) throw new Error("Invalid current password");

    const hashedPassword = await stringToHash(newPassword);

    await userModel
      .findOneAndUpdate({ _id: _id }, { password: hashedPassword })
      .exec();

    res.status(200).send({
      message: "password updated successfully",
    });
  } catch (error) {
    console.log("error ===>", error);

    res.status(500).send({
      message: "password update failed",
      error: error.message,
    });
  }
});

///////////////////////////////////////////////////////////////////////////////

///////////////////////////// Profile API //////////////////////////////////////

app.get("/api/v1/profile", (req, res) => {
  let body = req.body;

  console.log("req.cookies: ", req.cookies);

  if (!req?.cookies?.Token) {
    res.status(401).send({
      message: "include http-only credentials with every request",
    });
    return;
  }

  jwt.verify(req.cookies.Token, SECRET, (err, decodedData) => {
    if (!err) {
      console.log("decodedData: ", decodedData);

      const nowDate = new Date().getTime() / 1000;

      if (decodedData.exp < nowDate) {
        res.status(401);
        res.cookie("Token", "", {
          maxAge: 1,
          httpOnly: true,
        });
        res.send({ message: "token expired" });
      } else {
        console.log("token approved");

        res.send({
          message: "profile get successfully",
          userProfile: decodedData.email,
        });
      }
    } else {
      res.status(401).send("invalid token");
    }
  });
});

///////////////////////////////////////////////////////////////////////////////

//////////////////// post adding API //////////////////////////////////

//////////////////============= Multer ==================////////////////

const storageConfig = multer.diskStorage({
  destination: "./post-photos-uploads/",

  filename: (req, file, cb) => {
    console.log("mul-file: ", file);
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

const uploadMiddleware = multer({ storage: storageConfig });

///////////////////////////////////////////////////////////////////////////

app.post("/api/v1/post", uploadMiddleware.any(), (req, res) => {
  const body = req.body;

  if (!body.postText && !body.postImage) {
    res.status(400).send({
      message: "Atleast one prameter is required",
    });
    return;
  }
  bucket.upload(
    req.files[0].path,
    {
      destination: `postImages/${req.files[0].filename}`,
    },
    (err, file, apiResponse) => {
      if (!err) {
        file
          .getSignedUrl({
            action: "read",
            expires: "03-09-2999",
          })
          .then((urlData, err) => {
            if (!err) {
              console.log("public downloadable url: ", urlData[0]);

              try {
                fs.unlinkSync(req.files[0].path);
              } catch (err) {
                console.error(err);
              }
              console.log("deleted======================================>");

              ///////////////////////
              postModel.create(
                {
                  postText: body.postText,
                  postImage: urlData[0],
                  userId: req?.cookies?.Token.id,
                  date: new Date().toString(),
                },
                (err, post) => {
                  if (!err) {
                    res.status(201).send({
                      message: "Post successfully added",
                      data: post,
                    });
                  } else {
                    res.status(500).send({ message: "server error" });
                  }
                }
              );
              /////////////////////////
            }
          });
      }
    }
  );
});

///////////////////////////////////////////////////////////////////////////////

//////////////////// all Products get API //////////////////////////////////

app.get("/api/v1/posts", async (req, res) => {
  postModel.find({}, (err, data) => {
    if (!err) {
      res.send({
        message: "successfully get all posts :",
        data: data,
      });
    } else {
      res.status(500).send({
        message: "server error",
      });
    }
  });
});

///////////////////////////////////////////////////////////////////////////////

//////////////////// post Delete API //////////////////////////////////

app.delete("/api/v1/post/:id", (req, res) => {
  const id = req.params.id;

  postModel.deleteOne({ _id: id }, (err, deletedProduct) => {
    if (!err) {
      if (deletedProduct.deletedCount != 0) {
        res.send({
          message: "post deleted successfully",
          data: deletedProduct,
        });
      } else {
        res.status(404).send({
          message: "post did not found of this id : ",
          request_id: id,
        });
      }
    } else {
      res.status(500).send({
        message: "server error",
      });
    }
  });
});

///////////////////////////////////////////////////////////////////////////////

//////////////////// post Edit API //////////////////////////////////

app.put("/api/v1/post/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;

  if (!body.postText && !body.postImage) {
    res.status(400).send({
      message: "Atleast one prameter is required",
    });
    return;
  }

  try {
    let data = await postModel
      .findByIdAndUpdate(
        id,
        {
          postText: body.postText,
          postImage: body.image,
        },
        { new: true }
      )
      .exec();
    console.log(" updated data :===>", data);

    res.send({
      message: "product modified successfully",
      updated_Data: data,
    });
  } catch (err) {
    res.status(500).send({
      message: "server error",
    });
  }
});

///////////////////////////////////////////////////////////////////////////////

//////////////////// post Search API //////////////////////////////////

app.get("/api/v1/products/:name", (req, res) => {
  let findName = req.params.userName;

  postModel.find({ name: { $regex: `${findName}` } }, (err, data) => {
    if (!err) {
      if (data.length !== 0) {
        res.send({
          message: "successfully get all products :",
          data: data,
        });
      } else {
        res.status(404).send({
          message: "product not found",
        });
      }
    } else {
      res.status(500).send({
        message: "server error",
      });
    }
  });
});

///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////

const __dirname = path.resolve();

app.use("/", express.static(path.join(__dirname, "./web/build")));
app.use("*", express.static(path.join(__dirname, "./web/build/index.html")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
