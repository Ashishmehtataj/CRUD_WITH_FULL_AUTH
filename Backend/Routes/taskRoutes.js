import express from 'express'
import {createTask, deleteTask, getTasks, searchTask, updateTask} from '../Controller/taskController.js'

const taskRoutes = express.Router()

taskRoutes.post("/createTask",createTask)
taskRoutes.get('/gettasks',getTasks)
taskRoutes.put('/updatetask/:id',updateTask)
taskRoutes.get('/searchtask/:keyword',searchTask)
taskRoutes.delete('/deletetask/:id',deleteTask)

export default taskRoutes;