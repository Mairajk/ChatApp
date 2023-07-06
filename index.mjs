////===============>> starting  <<=============\\\\

import cors from "cors";
import path from "path";
import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { stringToHash, varifyHash } from "bcrypt-inzi";
// import mongoose from "mongoose";
// import multer from "multer";
// import fs from "fs";

// import bucket from "./firebase/index.mjs";
import authApis from "./Server/Routes/auth.mjs";
import Apis from "./Server/Routes/apis.mjs";

/** import middlewares */
import Authenticate from './Server/Middlewares/authenticate.mjs'

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


app.use('/auth/api/v1', authApis)


app.use("/api/v1", (req, res, next) => {
  Authenticate()
});


app.use('/api/v1', Apis)



///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////

const __dirname = path.resolve();

app.use("/", express.static(path.join(__dirname, "./web/build")));
app.use("*", express.static(path.join(__dirname, "./web/build/index.html")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
