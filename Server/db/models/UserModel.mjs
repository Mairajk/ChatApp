/** import mongoose */
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: String },
    profilePhoto: { type: String },
    phoneNumber: { type: String },
});

export default mongoose.model("users", userSchema);