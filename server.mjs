////===============>> starting  <<=============\\\\

import express from "express";
import cors from "cors";
import path from "path";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { stringToHash, varifyHash } from "bcrypt-inzi";
// import mongoose from "mongoose";
// import multer from "multer";
// import fs from "fs";

// import bucket from "./firebase/index.mjs";
import authApis from "./APIs/auth.mjs";

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


app.use('/api/v1', authApis)


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


app.use('/api/v1', chatApis)



///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////

const __dirname = path.resolve();

app.use("/", express.static(path.join(__dirname, "./web/build")));
app.use("*", express.static(path.join(__dirname, "./web/build/index.html")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
