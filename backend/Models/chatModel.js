import mongoose from 'mongoose'

const chatSchema = mongoose.Schema({
    users: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    latestMessage:{
        type:mongoose.Types.ObjectId,
        ref: 'Message'
    }
},
    {
        timestamps: true,
    })

export default mongoose.model('Chat', chatSchema)