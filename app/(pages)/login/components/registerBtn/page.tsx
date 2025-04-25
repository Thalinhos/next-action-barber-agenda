import { redirect } from "next/navigation"

export default function RegisterBtn(){

    async function redirectToRegister(){
        redirect('/register');
    }

    return(
        <button style={{ marginTop: "8px" }} onClick={redirectToRegister}>Register</button>
    )
}