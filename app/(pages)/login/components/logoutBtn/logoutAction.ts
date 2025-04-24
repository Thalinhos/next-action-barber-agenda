'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('token');
    return redirect('/login');
  }