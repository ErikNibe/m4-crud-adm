import { QueryConfig } from "pg";
import { tUserResult, tUserWithoutPassword } from "../../interfaces/users.interfaces";
import { AppError } from "../../errors";
import { client } from "../../database";
import { userWithoutPasswordSchema } from "../../schemas/users.schemas";

const activateUserService = async (userIdParam: number): Promise<tUserWithoutPassword> => {

    let queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            "id" = $1;
    `;

    let queryConfig: QueryConfig = {
        text: queryString,
        values: [userIdParam]
    };

    let queryResult: tUserResult = await client.query(queryConfig);

    if (queryResult.rows[0].active) {

        throw new AppError("User already active.", 400);
    };


    queryString = `
        UPDATE
            users
        SET
            "active" = true
        WHERE 
            "id" = $1
        RETURNING *;
    `;

    queryConfig = {
        text: queryString,
        values: [userIdParam]
    };

    queryResult = await client.query(queryConfig);

    const userWithoutPassword = userWithoutPasswordSchema.parse(queryResult.rows[0]);

    return userWithoutPassword;
};

export default activateUserService;