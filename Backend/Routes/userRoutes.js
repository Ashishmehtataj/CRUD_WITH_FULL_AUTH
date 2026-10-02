import { signIn, signUp } from "../Controller/userController.js";
import { User } from "../Model/User.js";
import express from 'express'

const userRoutes = express.Router()

userRoutes.post("/signup",signUp)
userRoutes.post('/signin',signIn)

export default userRoutes;