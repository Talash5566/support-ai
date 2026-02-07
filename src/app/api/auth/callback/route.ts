import { NextRequest, NextResponse } from "next/server";
import { Scalekit } from "../../../lib/Scalekit";

export async function GET(req:NextRequest) {

    const {searchParams} = new URL(req.url);
    const redirectUri = `${process.env.NEXT_URL}/api/auth/callback`;
    const code = searchParams.get('code');

    if(!code){
        return NextResponse.json({message:'code is not found '},{status:400})
    }

    const session = await Scalekit.authenticateWithCode(code,redirectUri);
    const respopnce = NextResponse.redirect(`${process.env.NEXT_URL}`)

    respopnce.cookies.set("acess_token",session.accessToken,{
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    path: '/',
    })

    return respopnce 
}