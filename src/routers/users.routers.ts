import { Router } from "express";
import { createUserController } from "../controllers/users.controllers";
import { verifyEmailExists } from "../middlewares/users.middlewares";


const userRoutes: Router = Router();

userRoutes.post("",  verifyEmailExists, createUserController);

export default userRoutes;