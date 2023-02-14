import format from "pg-format";
import { client } from "../../database";

import { iUserRequest, tUserWithoutPasswordResult, tUserWithoutPassword } from "../../interfaces/users.interfaces";

const createUserServices = async (reqData: iUserRequest): Promise<tUserWithoutPassword> => {

    const queryString: string = format(
        `
            INSERT INTO
                users(%I)
            VALUES(%L)
            RETURNING "id", "name", "email", "admin", "active";
        `,
        Object.keys(reqData),
        Object.values(reqData)
    );

    const queryResult: tUserWithoutPasswordResult = await client.query(queryString);

    return queryResult.rows[0];
};

export default createUserServices;