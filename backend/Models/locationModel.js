import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    }
})

export default mongoose.model('Location', locationSchema)