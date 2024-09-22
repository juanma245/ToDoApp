import { SECRET } from "../config.js";
import { TaskController } from "../controllers/task.js";
import jwt from 'jsonwebtoken'
import { Router } from "express";


export const taskRouter = Router()

//middlewere para obtener las cookies de autenticación
taskRouter.use((req,res,next) => {
    //Se obtiene la cookie desde la petición, para eso se usa la librería cookie-parser
    const token = req.cookies.access_token 
    
    //se añade el userID a la req
    req.session = {userId : null}

    try {
        //Se verifica el token obtenido 
        const data = jwt.verify(token,SECRET)
        //Solo si la sesión esta activa, se guarda el id en la sesión
        req.session.userId = data.id
    } catch (error) {
        req.session.userId = null
    }

    //avanzar a la petición
    next()
})

//Endpoit de obtener y listar tareas de cada usuario "/task/listTasks"
taskRouter.get("/listTasks",TaskController.listTasks)

//Endpoint de creación de una tarea /task/create
taskRouter.post("/create",TaskController.createTask)

//Endpoint para editar una tarea /task/editTask
taskRouter.patch("/editTask",TaskController.editTask)

//Endpoint marcar como completado o pendiente una tarea /task/changeState
taskRouter.patch("/changeState",TaskController.changeState)

//Endpoint para eliminar una tarea /task/deleteTask
taskRouter.delete("/deleteTask",TaskController.deleteTask)

