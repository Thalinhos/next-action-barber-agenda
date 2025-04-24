'use client'

import { useActionState } from "react";
import googleAction from "./googleAction";

export default function GoogleBtn() {

    const [state, formAction] = useActionState(googleAction, { message: "", success: false });

   return (
    <form action={googleAction}>
        <button style={{ marginTop: "8px" }}> Login with google</button>
    </form>
   )
}