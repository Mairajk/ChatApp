/** import mongoose */
import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    messageText: { type: String },
    sender: { type: String, required: true },
    send_To: { type: String, required: true },
    isUnread: { type: Boolean, default: true, required: true },
    send_date: { type: Date, default: Date.now, required: true },
    chatId: { type: mongoose.ObjectId, ref: 'chats', required: true },
});

export default mongoose.model("messages", messageSchema);
