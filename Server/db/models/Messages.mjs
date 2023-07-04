/** import mongoose */
import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    sender: { type: String },
    send_To: { type: String },
    messageText: { type: String },
    send_date: { type: Date, default: Date.now },
    unread: { type: Boolean, default: true },
});

export default mongoose.model("posts", messageSchema);
