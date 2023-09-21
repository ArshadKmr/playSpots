import mongoose from 'mongoose'

const walletModel = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    transaction: {
        type: String,
        required: true
    },
    amount: {
        type:Number,
        required: true
    }
},{
    timestamps: true
})

export default mongoose.model('Wallet', walletModel)