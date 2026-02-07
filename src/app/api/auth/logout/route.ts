import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const cookiesStore = await cookies()
    cookiesStore.delete("acess_token")
    return NextResponse.redirect(`${process.env.NEXT_URL}`)
}