/** import mongoose */
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    age: { type: String },
    phoneNumber: { type: String },
    profilePhoto: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
});

export default mongoose.model("users", userSchema);