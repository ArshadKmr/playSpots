import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    turfId: {
        type: mongoose.Types.ObjectId,
        ref: 'Turf',
        required: true
    },
    date: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    booking: {
        type: String,
        default: 'Booked',
        required: true
    },
    paymentId: {
        type: String,
    },
    team:{
        type:String,
        required: true
    }
},
    {
        timestamps: true
    })

export default mongoose.model('Booking', bookingSchema)