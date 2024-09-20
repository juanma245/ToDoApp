
import { userModel } from "../models/user.js";

export class userController{
    static async getUsers(req,res){
        const users = await userModel.getUsers()

        return res.json(users)
    }

    static async createUser(req,res){
        try{
            console.log('Datos recibidos:', req.body); 

            const {name,user,password } = req.body

            if (!name || !user || !password) {
                return res.status(400).json({ error: 'Faltan datos' });
            }

            const response = await userModel.createUser(name,user,password)

            return res.json(response)
        }catch(err){
            return res.status(400).json({'error' : err.message})
        }
        
    }

}