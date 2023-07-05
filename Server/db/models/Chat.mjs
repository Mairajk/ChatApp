/** import mongoose */
import mongoose from "mongoose";


const chatSchema = new mongoose.Schema({

    chatType: { type: String, enum: ['group', 'one-To-one'], required: true, ref: 'users' },
    participants: { type: [mongoose.ObjectId], required: true },
    groupProfilePhoto: { type: String, default: '' },
    admins: { type: [mongoose.ObjectId], default: [] }
});

export default mongoose.model("chats", chatSchema);
