import express from "express";
import UserModel from "../db/models/UserModel.mjs";
import { stringToHash, varifyHash } from "bcrypt-inzi";
import jwt from "jsonwebtoken";

const router = express.Router();

//////////////////  SIGNUP API ////////////////////////////////////

router.post("/signup");
//////////////////////////////////////////////////////////////////

//////////////////  LOGIN API ////////////////////////////////////

router.post("/login");
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

router.post("/forget-password/find-account");
///////////////////////////////////////////////////////////////////

///////////////////////////*******************////////////////////////////////////////

export default router;
