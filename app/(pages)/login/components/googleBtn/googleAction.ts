'use server'

import { redirect } from "next/navigation";

export default async function googleAction() {

    const urlOne = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile&access_type=offline`;

    console.log('sucesso')

    return redirect(urlOne);
    // return { message: "Login successful", success: true }
}