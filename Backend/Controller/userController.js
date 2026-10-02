import express from 'express'
import { User } from '../Model/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signUp = async (req, res) => {
    try {
        const { FullName, Email, Password } = req.body;
        if (!FullName || !Email || !Password) {
            return res.status(400).json({
                success: false,
                message: "User Name, Email, Password are required for Registered new User",
            })
        }

        const existingUser = await User.findOne({Email})
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            })
        }

        const password = await bcrypt.hash(Password, 10)

        const user = new User({ FullName, Email, Password: password });
        await user.save()


        return res.status(201).json({
            success: true,
            message: "User registered, redirect to login page",
            data: user
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error while registered user " + err.message,
        })
    }
}

export const signIn = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.status(400).json({
                success: false,
                message: "User Email and Password are required to login ...."
            })
        }

        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        const password = await bcrypt.compare(Password, user.Password);
        if (!password) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password "
            })
        }

        const token = jwt.sign({ Email: user.Email, id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: '10m' })

        return res.status(200).json({
            success:true,
            message:"User Login redirect to Main Page ....",
            data:user,
            token:token,
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal server error while signIn user "+err.message,
        })
    }
}