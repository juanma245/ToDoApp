import { TaskModel } from "../models/task.js";

export class TaskController{
    static async listTasks(req,res){
        const userId = req.session.userId
        
        if(userId === null){
            return res.status(401).json({"message" : "no autorizado"})
        }

        try {
            const task = await TaskModel.listTasks(userId)

            return res.status(200).json(task)
        } catch (error) {
            return res.json({"message" : error.message})   
        }
        
    }

    static async createTask(req,res){
    
        const {title,description,state} = req.body
        const userId = req.session.userId
        if(userId === null){
            return res.status(401).json({"message" : "no autorizado"})
        }

        try{
            const taskResponse = await TaskModel.createTask(userId,title,description,state)

            return res.status(201).json(taskResponse)
        }
        catch(error){
            return res.json({"message" : error.message})
        }
        


    }

    static async editTask(req,res){
        const {idTask,title,description} = req.body

        try{
            const taskMessage = await TaskModel.editTask(idTask,title,description)

            return res.status(200).json(taskMessage)
        }catch(error){
            return res.status(500).json({"message" : error.message})
        }

    }

    static async deleteTask(req,res){

    }

    static async changeState(req,res){
        
    }
}