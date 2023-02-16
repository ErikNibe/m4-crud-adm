import { Router } from "express";
import { loginController } from "../controllers/login.controller";
import { loginRequestSchema } from "../schemas/login.schemas";
import validateData from "../middlewares/validateData.middlewares";

const loginRoutes: Router = Router();

loginRoutes.post("", validateData(loginRequestSchema), loginController);

export default loginRoutes;