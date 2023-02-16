import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { tUserResult } from "../interfaces/users.interfaces";
import { AppError } from "../errors";

const verifyUserExists = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const userIdParam: number = parseInt(req.params.id);

    const queryString: string = `
        SELECT
            *
        FROM 
            users
        WHERE
            "id" = $1;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userIdParam]
    };

    const queryResult: tUserResult = await client.query(queryConfig);
    
    if (!queryResult.rowCount) {

        throw new AppError("User not found.", 404);
    };

    return next();
};

export default verifyUserExists;