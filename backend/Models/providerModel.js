import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    aadhaar: {
        public_id: {
            type: String,
            // required: true,
        },
        url: {
            type: String,
            // required: true,
        }
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    wallet:{
        type:Number,
        default: 0,
        required: true
    }
},
    {
        timestamps: true,
    },)

export default mongoose.model('Provider', providerSchema)