import { SECRET } from "../config.js";
import jwt from 'jsonwebtoken';
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

    static async login(req,res){
        const {user,password} = req.body

        try{
            const userDb = await userModel.login(user,password)
            const token = jwt.sign({id : userDb.id,username : userDb.username},SECRET,{
                expiresIn : '1h'
            })
            return res.cookie('acces_token',token, {
                httponly : true,
                maxAge : 100 * 60 *60 
            }).json({'acces' : token})
        }
        catch(err){
            return res.status(404).json({"error" : err.message})
        }


    }

}