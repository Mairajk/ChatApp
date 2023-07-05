/** import mongoose */
import mongoose from "mongoose";


const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    isUsed: { type: Boolean, default: false },
});

export default mongoose.model("OTPs", otpSchema);
