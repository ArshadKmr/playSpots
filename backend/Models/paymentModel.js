import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema({
    paymentId:{
        type:String,
        required:true,
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true,
})

export default mongoose.model('Payment', paymentSchema)