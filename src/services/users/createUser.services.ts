import format from "pg-format";
import { client } from "../../database";
import { tUserRequest, tUserWithoutPasswordResult, tUserWithoutPassword } from "../../interfaces/users.interfaces";
import { userWithoutPasswordSchema } from "../../schemas/users.schemas";


const createUserService = async (reqData: tUserRequest): Promise<tUserWithoutPassword> => {

    const queryString: string = format(
        `
            INSERT INTO
                users(%I)
            VALUES(%L)
            RETURNING *;
        `,
        Object.keys(reqData),
        Object.values(reqData)
    );

    const queryResult: tUserWithoutPasswordResult = await client.query(queryString);

    const userWithoutPassword = userWithoutPasswordSchema.parse(queryResult.rows[0]);

    return userWithoutPassword;
};

export default createUserService;