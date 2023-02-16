import { hashSync } from "bcryptjs";
import { z } from "zod";


const userRequestSchema = z.object({
    name: z.string().max(20),
    email: z.string().email(),
    password: z.string().transform((pass) => {
        return hashSync(pass, 10)
    }),
    admin: z.boolean().optional()
});

const userSchema = userRequestSchema.extend({
    id: z.number(),
    active: z.boolean()
});

const updateUserRequestSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().transform((pass) => {
        return hashSync(pass, 10)
    }).optional()
});

const userWithoutPasswordSchema = userSchema.omit({password: true});


export { userRequestSchema, userSchema, userWithoutPasswordSchema , updateUserRequestSchema};