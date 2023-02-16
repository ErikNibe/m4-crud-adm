import { tUserWithoutPassword } from "../../interfaces/users.interfaces";
import { client } from "../../database";


const listUsersService = async (): Promise<tUserWithoutPassword[]> => {

    const queryString: string = `
        SELECT
            "id", "name", "email", "admin", "active"
        FROM
            users;
    `;

    const queryResult = await client.query(queryString);

    return queryResult.rows;
};

export default listUsersService;