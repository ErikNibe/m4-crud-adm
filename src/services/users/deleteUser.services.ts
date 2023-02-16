import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { tUserResult } from "../../interfaces/users.interfaces";
import { AppError } from "../../errors";

const deleteUserService = async (userIdParam: number): Promise<void> => {

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

    const queryResult: tUserResult = await client.query(queryConfig);

    if (!queryResult.rows[0].active) {

        throw new AppError("User already deleted.", 400);
    };

    queryString = `
        UPDATE
            users
        SET
            "active" = false
        WHERE
            "id" = $1;
    `;

    queryConfig = {
        text: queryString,
        values: [userIdParam]
    };

    await client.query(queryConfig);
};

export default deleteUserService;