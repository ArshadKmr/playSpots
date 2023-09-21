import mongoose from 'mongoose';


const connectDB= async()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to database ${conn.connection.host}`)
    }catch(error){
        console.log(error.message);
        process.exit()
    }
}

export default connectDB