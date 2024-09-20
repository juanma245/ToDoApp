import { Router } from "express";
import { UserController } from "../controllers/user.js";

export const userRouter = Router()

userRouter.get("/",UserController.getUsers)

userRouter.post("/create",UserController.createUser)

userRouter.post("/login",UserController.login)