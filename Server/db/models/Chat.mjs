/** import mongoose */
import mongoose from "mongoose";


const chatSchema = new mongoose.Schema({
    groupProfilePhoto: { type: String, default: '' },
    admins: { type: [mongoose.ObjectId], default: [] },
    participants: { type: [mongoose.ObjectId], required: true },
    chatType: { type: String, enum: ['group', 'one-To-one'], required: true, ref: 'users' },
});

export default mongoose.model("chats", chatSchema);
