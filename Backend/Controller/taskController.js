import { Task } from "../Model/Task.js";
import express from 'express'

export const createTask = async(req,res)=>{
    try{
        const {Title, Description, addedDate, dueDate, Status} = req.body;
        if(!Title || !addedDate || !dueDate || !Status){
            return res.status(400).json({
                success:false,
                message:"Task Title, addedDate, dueDate, and Status are required",
            })
        }

        const task = new Task({Title, Description, addedDate, dueDate, Status});
        await task.save();

        return res.status(201).json({
            success:true,
            message:"Task added",
            data:task
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal server error while create new Task "+err.message,
        })
    }
}

export const getTasks = async(req,res)=>{
    try{
        const task = await Task.find();
        if(task.length===0){
            return res.status(200).json({
                success:true,
                message:"Zero task found in Database",
                data:[]
            })
        }

        return res.status(200).json({
            success:true,
            message:"Tasks founded",
            data:task,
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal server error while getting task from Database "+err.message,
        })
    }
}

export const updateTask = async(req,res)=>{
    try{
        const {Title, Description, addedDate, dueDate, Status} = req.body;
        if(!Title || !addedDate || !dueDate || !Status){
            return res.status(400).json({
                success:false,
                message:"Task Title, addedDate, dueDate and Status are required",
            })
        }

        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});

        if(!task){
            return res.status(404).json({
                success:false,
                message:"Task not found",
            })
        }

        return res.status(200).json({
            success:true,
            message:"Task updated",
            data:task
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal server error while update task from Database "+err.message,
        })
    }
}

export const searchTask = async(req,res)=>{
    try{
        const keyword = req.params.keyword;
        if(!keyword || !keyword.trim()===""){
            return res.status(400).json({
                success:false,
                message:"Search keyword are required",
            })
        }

        const task = await Task.find({
            $or:[
                {Title: {$regex:keyword, $options:'i'}},
                {Status:{$regex:keyword, $options:'i'}},
            ]
        })
        
        if(task.length === 0){
            return res.status(200).json({
                success:true,
                message:"Zero task found by keyword",
                data:[]
            })
        }
        
        return res.status(200).json({
            success:true,
            message:"Task founded by search keyword",
            data:task,
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal server error while search Task "+err.message,
        })
    }
}

export const deleteTask = async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).json({
                success:false,
                message:"Task not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Task deleted",
            data:task
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal server error while delete Task "+err.message,
        })
    }
}