import { Scalekit } from "../lib/Scalekit";
import { cookies } from "next/headers";

export async function getSession() {
    const session = await cookies()
    const token = session.get('acess_token')?.value
    if(!token){
        return null ;
    }
    try {
        const result:any = await Scalekit.validateToken(token);
        const user = await Scalekit.user.getUser(result.sub);
        return user ;
    } catch (error) {
        console.log(error);
    }
    
}