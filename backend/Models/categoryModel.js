import mongoose from 'mongoose';

const categoryModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    isAvailable:{
        type:Boolean,
        default:true
    }
})

export default mongoose.model('Category', categoryModel)