import mongoose from 'mongoose'

// Define the Notification schema
const notificationSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Types.ObjectId,
        ref: 'Chat',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    recipient: {
        type: mongoose.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
    },
    sender:{
        type: mongoose.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
});

// Create the Notification model
export default mongoose.model('Notification', notificationSchema)
