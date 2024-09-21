import bcrypt from 'bcrypt';
import { pool } from '../database/conection.js';

export class UserModel{
    static async getUsers(){
        try{
            const [results] = await pool.query(
                'Select * from usuario' 
            );

            return results
        }catch(err){
            return "Error sql"
        }
        
    }

    static async getUser(user){
        try{
            const [results] = await pool.execute(
                'Select idUsuario,usuario,contrasenia from usuario where usuario = ?',[user]
            );

            return results
        }catch(err){
            return "Error sql"
        }
        
    }

    static async existUser(user){
        try{
            const [results] = await pool.execute(
                'Select idUsuario from usuario where usuario = ?',[user]
            );
            if(results.length === 0){
                return false
            }
        
            return true
        }catch(err){
            return "Error sql"
        }
    }

    static async createUser(name, user, password){
        
        if(await this.existUser(user)){
            throw new Error("el usuario ya existe")
        }

        const hashedPassword = await bcrypt.hash(password,10)

        try{
            const [results] = await pool.execute(
                "insert into usuario(nombre,usuario,contrasenia) values(?,?,?);",[name,user,hashedPassword])

            if(results.affectedRows === 1){
                return {'message' : "Usuario creado"}
            }
        }
        catch{
            throw new Error("Error sql")
        }
    
    }

    static async login(user,password){
        const userDb = await this.getUser(user)

        if(userDb.length === 0){
            throw new Error("Usuario o contraseña incorrecta")
        }

        const valid = await bcrypt.compare(password,userDb[0].contrasenia)

        if(!valid){
            throw new Error("usuario o contraseña incorrecta")
        }
        
        const response = {
            "id" : userDb[0].idUsuario,
            "username" : userDb[0].usuario

        }

        return response

    }

}