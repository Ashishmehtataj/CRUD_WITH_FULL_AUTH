import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import taskRoutes from './Routes/taskRoutes.js'
import {connectToDatabase} from './Config/Database.js'
import userRoutes from './Routes/userRoutes.js'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use('/task',taskRoutes)
app.use('/user',userRoutes)

connectToDatabase();
const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})