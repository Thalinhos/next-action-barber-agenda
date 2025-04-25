'use server'

import { z } from 'zod';

export default async function actionRegister(prevState: any, data: FormData) {

    const schema = z.object({
        username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters long" })
    });

    try {
        const parsedData = schema.parse({
            username: data.get("username"),
            email: data.get("email"),
            password: data.get("password"),
        });

        return { message: "Register successful", success: true };

    } catch (err) {
        const errors = err.errors.map((e) => e.message).join(", ")
        console.log(err.errors)
        console.log(errors)
        return { message: errors, success: false };
    }
}
