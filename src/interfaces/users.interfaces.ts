import { QueryResult } from "pg";
import { z } from "zod";
import { updateUserRequestSchema, userRequestSchema, userSchema } from "../schemas/users.schemas";


type tUserRequest = z.infer<typeof userRequestSchema>;

type tUser = z.infer<typeof userSchema>;

type tUserWithoutPassword = Omit<tUser, "password">;
type tUserWithoutPasswordResult = QueryResult<tUserWithoutPassword>;

type tUserResult = QueryResult<tUser>;

type tUpdateUserRequest = z.infer<typeof updateUserRequestSchema>;

export { tUserRequest, tUserWithoutPassword, tUserWithoutPasswordResult, tUserResult, tUpdateUserRequest };