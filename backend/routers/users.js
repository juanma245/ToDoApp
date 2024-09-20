import { Router } from "express";
import { userController } from "../controllers/user.js";

export const userRouter = Router()

userRouter.get("/",userController.getUsers)

userRouter.post("/create",userController.createUser)