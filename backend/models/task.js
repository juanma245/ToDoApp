import { pool } from "../database/conection.js";

export class TaskModel{
    static async listTasks(id){
        try{
            const [results] = await pool.execute(
                'select idTarea,titulo,descripcion,estado from tarea where usuario = ?;',[id]
            )

            return results
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    static async createTask(id,title,description,state){
        try{
            const [results] = await pool.execute(
                'insert into tarea(titulo,descripcion,estado,usuario) values(?,?,?,?);',[title,description,state,id]
            )
            if(results.affectedRows === 0){
                throw new Error("Fallo en la creacion ")
            }

            return {"idCreated" : results.insertId}
        }catch(err){
            throw new Error(err.message)
        }
    }

    static async editTask(id,title,description){
        
        let sql = ""
        let datos = []

        if(title !== undefined && description !== undefined){
            sql = "update tarea set titulo = ?, descripcion = ? where idTarea = ?"
            datos = [title,description,id]
            
        }
        else if(title !== undefined){
            sql = "update tarea set titulo = ? where idTarea = ?"
            datos = [title,id]
        }
        else if(description !== undefined){
            sql = "update tarea set descripcion = ? where idTarea = ?"
            datos = [description,id]
        }

        try {
            const [results] = await pool.execute(sql,datos)
            if(results.affectedRows === 0){
                throw new Error("fallo al editar")
            }

            return {"registrso editados" : results.affectedRows}
        } catch (error) {
            throw new Error(error.message)
        }


    }

    static async userHaveTask(userId,idTask){
        try{
            const [results] = await pool.execute(
                'select idTarea from tarea where usuario = ? and idTarea = ?',[userId,idTask]
            )

            if(results.length === 0){
                return false
            }

            return true
        }catch(err){
            throw new Error(err.message)
        }
    }
    
    static async deleteTask(idTask,userId){
        if(!this.userHaveTask(userId,idTask)){
            throw new Error("El usuario no tiene permismos para esta tarea")   
        }
        try{
            const [results] = await pool.execute(
                "delete from tarea where idTarea = ?",[idTask]
            )

            if(results.affectedRows === 0){
                throw new Error("error al eliminar")
            }
            
            return {"messsage" : "tarea eliminada"}
        }catch(err){
            throw new Error(err.message)
        }
    }

    static async changeState(idTask,state,userId){
        if(!this.userHaveTask(userId,idTask)){
            throw new Error("El usuario no tiene permismos para esta tarea")   
        }
        try{
            const [results] = await pool.execute(
                "update tarea set estado = ? where idTarea = ?",[state,idTask]
            )

            if(results.affectedRows === 0){
                throw new Error("error al cambiar de estado ")
            }
            
            return {"messsage" : "Estado cambiado"}
        }catch(err){
            throw new Error(err.message)
        }

    }
}