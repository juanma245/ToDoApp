import { Router } from "express";
import { UserController } from "../controllers/user.js";

export const userRouter = Router()

userRouter.get("/",UserController.getUsers)

//Endpoint de creación de usuario "/user/create""
userRouter.post("/create",UserController.createUser)

//Endpoint de login "/user/login"
userRouter.post("/login",UserController.login)