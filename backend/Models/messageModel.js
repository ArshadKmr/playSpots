import mongoose from 'mongoose'
const messageSchema = mongoose.Schema({
    chatId: {
        type: mongoose.Types.ObjectId,
        ref: 'Chat'
    },
    senderId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
    }
},
    {
        timestamps: true,
    }
)
export default mongoose.model('Message', messageSchema)