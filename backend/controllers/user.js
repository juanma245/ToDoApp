import { SECRET } from "../config.js";
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/user.js";

export class UserController{
    static async getUsers(req,res){
        const users = await UserModel.getUsers()

        return res.json(users)
    }

    static async createUser(req,res){
        try{

            const {name,user,password } = req.body

            if (!name || !user || !password) {
                return res.status(400).json({ error: 'Faltan datos' });
            }

            const response = await UserModel.createUser(name,user,password)

            return res.json(response)
        }catch(err){
            return res.status(400).json({'error' : err.message})
        }
        
    }

    static async login(req,res){
        const {user,password} = req.body

        try{
            const userDb = await UserModel.login(user,password)

            const token = jwt.sign({id : userDb.id,username : userDb.username},SECRET,{
                expiresIn : '1h'
            })

            return res.cookie('access_token',token, {
                httponly : true,
                maxAge : 100 * 60 *60,
                secure : true,
                sameSite : "none" 
                
            }).json({'access' : "autorizado"})
        }
        catch(err){
            return res.status(404).json({"error" : err.message})
        }


    }

}