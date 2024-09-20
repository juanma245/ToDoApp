import { pool } from "../database/conection.js";

export class TaskModel{
    static async listTasks(){

    }

    static async createTask(id,title,description,state){
        try{
            const [results] = await pool.execute(
                'insert into tarea(titulo,descripcion,estado,usuario) values(?,?,?,?);',[title,description,state,id]
            );
            if(results.affectedRows === 0){
                throw new Error("Fallo en la creacion ")
            }

            return {"idCreated" : results.insertId}
        }catch(err){
            throw new Error(err.message)
        }
    }

    static async editTask(){

    }

    static async deleteTask(){

    }

    static async changeState(){

    }
}