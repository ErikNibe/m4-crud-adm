import { Request, Response } from "express";
import { tUpdateUserRequest, tUserRequest } from "../interfaces/users.interfaces";
import { AppError } from "../errors";
import createUserService from "../services/users/createUser.services";
import listUsersService from "../services/users/listUsers.services";
import listUserService from "../services/users/listUser.services";
import updateUserService from "../services/users/updateUser.services";
import deleteUserService from "../services/users/deleteUser.services";
import activateUserService from "../services/users/activateUser.services";


const createUserController = async (req: Request, res: Response): Promise<Response> => {
    
    const reqData: tUserRequest = req.body;

    const newUser = await createUserService(reqData)

    return res.status(201).json(newUser);
};

const listUsersController = async (req: Request, res: Response): Promise<Response> => {

    const users = await listUsersService();
    
    return res.json(users);
};

const listUserController = async (req: Request, res: Response): Promise<Response> => {

    const userId = req.user.id;

    const user = await listUserService(userId);

    return res.json(user);
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {  

    const reqData: tUpdateUserRequest = req.body;
    const { id, admin } = req.user;
    const userIdParam: number = parseInt(req.params.id);

    if (!admin && id !== userIdParam) {

        throw new AppError("Insufficient permission.", 403);
    };

    const updatedUser = await updateUserService(reqData, userIdParam);

    return res.json(updatedUser);
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {

    const { id, admin } = req.user;
    const userIdParam: number = parseInt(req.params.id);

    if (!admin && id !== userIdParam) {

        throw new AppError("Insufficient permission.", 403);
    };

    await deleteUserService(userIdParam);

    return res.status(204).send();
};

const activateUser = async (req: Request, res: Response): Promise<Response> => {

    const userIdParam: number = parseInt(req.params.id);

    const activatedUser = await activateUserService(userIdParam)

    return res.json(activatedUser);
};

export { createUserController, listUsersController, listUserController, updateUser, deleteUser, activateUser };