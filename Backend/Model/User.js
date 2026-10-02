import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    FullName:{
        type:String,
        required:[true,"Full Name are required"],
        minlength:[3,"Name should be more than 3 character"],
    },
    Email:{
        type:String,
        required:[true,"Email are required"],
        unique:[true,"Email already exists please enter another email"],
    },
    Password:{
        type:String,
        required:[true,"Password are required"],
    }
},{timestamps:true})

export const User = mongoose.model("User",userSchema);