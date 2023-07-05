/** import mongoose */
import mongoose from "mongoose";


const otpSchema = new mongoose.Schema({
    otp: { type: String, required: true },
    email: { type: String, required: true },
    isUsed: { type: Boolean, default: false },
});

export default mongoose.model("OTPs", otpSchema);
