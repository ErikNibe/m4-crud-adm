import { QueryConfig } from "pg";
import { tUserWithoutPassword } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { userWithoutPasswordSchema } from "../../schemas/users.schemas";

const listUserService = async (userId: number): Promise<tUserWithoutPassword>  => {

    const queryString = `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    };

    const queryResult = await client.query(queryConfig);

    const userWithouPassword = userWithoutPasswordSchema.parse(queryResult.rows[0]);

    return userWithouPassword;
};

export default listUserService;