'use client'

import { useActionState } from 'react';
import { loginAction } from './action';
import { redirect } from 'next/navigation';
import GoogleBtn from './components/googleBtn/googleBtn';
import RegisterBtn from './components/registerBtn/page';


export default function Login() {
  const [state, formAction] = useActionState(loginAction, { message: "", success: false });
;
  if (state?.success) {
    // document.location.href = "/admin";
    return redirect("/admin");
  }

  return (
    <div className="page">
      <h1>Login</h1>
      <form action={formAction} method='POST'>
        <label>
          Username:
          <input type="text" name="username" required />
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
      <RegisterBtn/>
      <GoogleBtn/>
    </div>
  );
}
