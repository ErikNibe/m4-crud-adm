import { z } from "zod";
import { loginRequestSchema } from "../schemas/login.schemas";

type tLoginRequest = z.infer<typeof loginRequestSchema>;

export { tLoginRequest };