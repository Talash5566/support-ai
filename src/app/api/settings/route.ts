import Settings from "@/models/settings.model";
import { NextRequest, NextResponse } from "next/server";
import connectDb from '../../lib/db'
 export async function POST(req:NextRequest) {
    try {
        const {ownerId , buisnessName , suppportEmail , knowledge} = await req.json()
        if(!ownerId){
            return NextResponse.json(
                {
                    message:"ownerId not found",
                    status:"400"
                }
            )
        }
        await connectDb()
        const settings = await Settings.findOneAndUpdate(
            {ownerId},
            {ownerId , buisnessName , suppportEmail , knowledge},
            {new:true ,upsert:true}
        )

        return NextResponse.json(settings)
    } catch (error) {
        return NextResponse.json(
            {
                message:`Error in getiing ownerId ${error}`,
                status:"400"
            }
        )
    }
}