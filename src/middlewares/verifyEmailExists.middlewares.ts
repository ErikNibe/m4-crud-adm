import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { tUserResult } from "../interfaces/users.interfaces";
import { AppError } from "../errors";


const verifyEmailExists = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const { email } = req.body;

    const queryString = `
        SELECT
            *
        FROM
            users
        WHERE
            "email" = $1;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [email]
    };

    const queryResult: tUserResult = await client.query(queryConfig);

    if (queryResult.rowCount) {
        throw new AppError("Email already exists, try another one.", 409);
    };

    return next();
};

export default verifyEmailExists;