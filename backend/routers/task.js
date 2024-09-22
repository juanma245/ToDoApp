import { SECRET } from "../config.js";
import { TaskController } from "../controllers/task.js";
import jwt from 'jsonwebtoken'
import { Router } from "express";


export const taskRouter = Router()

taskRouter.use((req,res,next) => {
    const token = req.cookies.access_token 
    

    req.session = {userId : null}

    try {
        const data = jwt.verify(token,SECRET)
        req.session.userId = data.id
    } catch (error) {
        req.session.userId = null
    }

    next()
})

taskRouter.get("/listTasks",TaskController.listTasks)

taskRouter.post("/create",TaskController.createTask)

taskRouter.patch("/editTask",TaskController.editTask)

taskRouter.patch("/changeState",TaskController.changeState)

taskRouter.delete("/deleteTask",TaskController.deleteTask)

