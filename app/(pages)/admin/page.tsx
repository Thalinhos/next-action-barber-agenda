import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import LogoutBtn from "../login/components/logoutBtn/logoutBtn";


interface userInfo {
    username: string
}

export default async function Admin() {

    async function verifyToken(){
        try{
            const cookieStore = await cookies();
            const token = cookieStore.get("token")?.value;
            if (!token) { return redirect("/login"); }

            return jwt.verify(token, `${process.env.JWT_SECRET}`);
        }
        catch(e){
            // console.log(e);
            return redirect("/login");
        }
    }

    //@ts-ignore
    const user: userInfo = await verifyToken();
   
    
    return (
        <div className="page">
          <h1>Admin</h1>
          <h4>Logged in as: {user?.username}</h4>
          <p>This is the admin page.</p>
          <LogoutBtn/>
        </div>
        )
}
    

