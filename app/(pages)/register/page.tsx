'use client'

import { useActionState } from "react";
import actionRegister from "./action";

export default function RegisterPage() {
    
    const [state, formAction] = useActionState(actionRegister, { message: "", success: false });

    return (
        <>
              <div className="page">
                  <h1>Register</h1>
                  <form action={formAction} method="POST">
                    <label>
                      Username:
                      <input type="text" name="username" required />
                    </label>
                    <br />
                    <label>
                      Email:
                      <input type="email" name="email" required/>
                    </label>
                    <br />
                    <label>
                      Password:
                      <input type="password" name="password" required />
                    </label>
                    <br />
                    <button type="submit">Login</button>
                    {state?.message && <p>{state?.message}</p>}
                  </form>

                </div>
        </>
    )
}