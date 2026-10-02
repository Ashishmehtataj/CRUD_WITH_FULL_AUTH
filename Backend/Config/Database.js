import mongoose from "mongoose";

export const connectToDatabase = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log("Connect to MongoDB Database")
    }catch(err){
        console.log("Error found while connect to Database "+err.message)
        process.exit(1)
    }
}