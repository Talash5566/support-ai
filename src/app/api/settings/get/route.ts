import connectDb from "@/app/lib/db";
import { getSession } from "@/app/lib/getSession";
import Settings from "@/models/settings.model";
import { NextRequest , NextResponse } from "next/server";

export async function GET(req:NextRequest) {
   try {
    const session = await getSession()
    const ownerId = session?.user?.id 

    if(!ownerId){
        return NextResponse.json(
            { message: "ownerId not found" },
            { status: 400 }
          );
    }

    await connectDb()

    const settings = await Settings.findOne({ownerId})
  
    return NextResponse.json(settings, { status: 200 });
   } catch (error) {
    return NextResponse.json(
        { message: `Error fetching settings: ${error}` },
        { status: 500 }
      );
   }
    
}