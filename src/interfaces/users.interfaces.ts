import { QueryResult } from "pg";

interface iUserRequest {
    name: string,
    email: string,
    password: string,
    admin: boolean,
    active: boolean
};

interface iUser extends iUserRequest {
    id: number
};

type tUserWithoutPassword = Omit<iUser, "password">;
type tUserWithoutPasswordResult = QueryResult<tUserWithoutPassword>;

type tUserResult = QueryResult<iUser>;

export { iUserRequest, tUserWithoutPassword, tUserWithoutPasswordResult, tUserResult };