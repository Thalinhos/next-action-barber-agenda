'use server'

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function loginAction(prevState: any, data: FormData) {
    
    const username = data.get("username");
    const password = data.get("password");

    if(username !== "admin" || password !== "admin") {
        return { message: "Invalid username or password", success: false };
    }

    const token = jwt.sign({ username }, `${process.env.JWT_SECRET}`, { expiresIn: "1min" });

    if(!token) {
        return { message: "Failed to generate token", success: false };
    }

    const cookieStore = await cookies();
    cookieStore.set("token", token);

    return { message: "Login successful", success: true };
}