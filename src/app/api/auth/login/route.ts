import { NextRequest, NextResponse } from "next/server";
import { Scalekit } from "../../../lib/Scalekit";
export async function GET(params:NextRequest) {
    const redirectUri = `${process.env.NEXT_URL}/api/auth/callback`;
    const authorizationUrl = Scalekit.getAuthorizationUrl(redirectUri);
    return NextResponse.redirect(authorizationUrl);
}