import mongoose from "mongoose";

///////////////////////////////// USER schema and model ////////////////////////

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: String },
  profilePhoto: { type: String },
  contact: { type: String },
});

export const userModel = mongoose.model("Users", userSchema);

/////////////////////////// post model and Schema //////////////////////////////////

let messageSchema = new mongoose.Schema({
  sender: { type: String },
  send_To: { type: String },
  messageText: { type: String },
  date: { type: Date, default: Date.now },
  unread: { type: Boolean, default: true },
});

export const messageModel = mongoose.model("posts", messageSchema);

//////////////////////////////////////////////////////////////////////////////

/////////////////////////// OTP model and Schema //////////////////////////////////

let otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  isUsed: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now },
});

export const otpModel = mongoose.model("OTPs", otpSchema);

//////////////////////////////////////////////////////////////////////////////

const mongodbURI =
  process.env.mongodbURI ||
  "mongodb+srv://MairajK:workhardin@cluster0.sihvwcq.mongodb.net/chat-app?retryWrites=true&w=majority";

mongoose.connect(mongodbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on("connected", function () {
  //connected
  console.log("Mongoose is connected");
});

mongoose.connection.on("disconnected", function () {
  //disconnected
  console.log("Mongoose is disconnected");
  process.exit(1);
});

mongoose.connection.on("error", function (err) {
  //any error
  console.log("Mongoose connection error: ", err);
  process.exit(1);
});

process.on("SIGINT", function () {
  /////this function will run jst before app is closing
  console.log("app is terminating");
  mongoose.connection.close(function () {
    console.log("Mongoose default connection closed");
    process.exit(0);
  });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////
