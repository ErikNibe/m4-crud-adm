import { Request, Response } from "express";
import { iUserRequest } from "../interfaces/users.interfaces";
import createUserServices from "../services/users/createUser.services";

const createUserController = async (req: Request, res: Response): Promise<Response> => {
    
    const reqData: iUserRequest = req.body;

    const newUser = await createUserServices(reqData)

    return res.status(201).json(newUser);
};

export { createUserController };