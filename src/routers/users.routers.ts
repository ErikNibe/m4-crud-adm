import { Router } from "express";
import { activateUser, createUserController, deleteUser, listUserController, listUsersController, updateUser } from "../controllers/users.controllers";
import { updateUserRequestSchema, userRequestSchema } from "../schemas/users.schemas"
import verifyEmailExists from "../middlewares/verifyEmailExists.middlewares";
import validateData from "../middlewares/validateData.middlewares";
import verifyTokenIsValid from "../middlewares/verifyTokenIsValid.middlewares";
import verifyIsAdmin from "../middlewares/verifyIsAdmin.middlewares";
import verifyUserExists from "../middlewares/verifyUserExists.middlewares";


const userRoutes: Router = Router();

userRoutes.post("",  verifyEmailExists, validateData(userRequestSchema), createUserController);
userRoutes.get("", verifyTokenIsValid, verifyIsAdmin, listUsersController);
userRoutes.get("/profile", verifyTokenIsValid, listUserController);
userRoutes.patch("/:id", verifyEmailExists, verifyUserExists, validateData(updateUserRequestSchema), verifyTokenIsValid, updateUser);
userRoutes.delete("/:id", verifyTokenIsValid, verifyUserExists, deleteUser);
userRoutes.put("/:id/recover", verifyTokenIsValid, verifyUserExists, verifyIsAdmin, activateUser);

export default userRoutes;