import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    Title:{
        type:String,
        required:[true,"Title is required"],
        minlength:[3,"Task Title length is more than 3 character"],
    },
    Description:{
        type:String,
    },
    addedDate:{
        type:String,
        required:[true,"Added Date is required"],
    },
    dueDate:{
        type:String,
        required:[true,"Due Date is required"],
    },
    Status:{
        type:String,
        required:[true,"Task Status is required"],
        enum:["Pending","Complete","Incomplete"],
    }
},{timestamps:true})

export const Task = mongoose.model("Task",taskSchema)