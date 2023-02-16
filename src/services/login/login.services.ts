import { QueryConfig } from "pg";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { tLoginRequest } from "../../interfaces/login.interfaces";
import { client } from "../../database";
import { AppError } from "../../errors";
import { tUserResult } from "../../interfaces/users.interfaces";
import "dotenv/config";


const loginService = async (reqData: tLoginRequest): Promise<string> => {

    const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            "email" = $1;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [reqData.email]
    };

    const queryResult: tUserResult = await client.query(queryConfig);

    if (!queryResult.rowCount) {

        throw new AppError("Email or password incorrect.", 401); 
    };

    const pwdMatches = await compare(reqData.password, queryResult.rows[0].password);

    if (!pwdMatches) {
    
        throw new AppError("Email or password incorrect.", 401);
    }

    const token: string = jwt.sign(
        {
            admin: queryResult.rows[0].admin
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: "24h",
            subject: queryResult.rows[0].id.toString()
        }
    );

    return token;
};

export default loginService;