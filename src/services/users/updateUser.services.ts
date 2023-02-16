import { QueryConfig } from "pg";
import format from "pg-format";
import { tUpdateUserRequest, tUserWithoutPassword } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { userWithoutPasswordSchema } from "../../schemas/users.schemas";

const updateUserService = async (reqData: tUpdateUserRequest, userParamId: number): Promise<tUserWithoutPassword> => {
    
    let queryString = format(
        `
        UPDATE
            users
        SET(%I) = ROW(%L)
        WHERE
            id = $1
        RETURNING *;
        `,
        Object.keys(reqData),
        Object.values(reqData)
    );

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userParamId]
    };

    const queryResult = await client.query(queryConfig);

    const userWithoutPassword = userWithoutPasswordSchema.parse(queryResult.rows[0]);

    return userWithoutPassword;

};

export default updateUserService;