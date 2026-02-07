import connectDb from "@/app/lib/db";
import Settings from "@/models/settings.model";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function OPTIONS() {
    return NextResponse.json({}, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

export async function POST(req:NextRequest) {
    try {
        const {ownerId , message} = await req.json();
        if(!ownerId || !message) {
            return NextResponse.json({
                message:"ownerId and message is required"
            })
        }
        await connectDb()
        const settings = await Settings.findOne({ownerId});
        if(!settings){
            return NextResponse.json({
                message:"OwnerId yet not configured"
            })
        }

        const KNOWLEDGE = `
        buisnessname - ${settings.buisnessName || "not provided"}
        supportemail - ${settings.suppportEmail || "not provided"}
        knowledge - ${settings.knowledge || "not provided"}
        `
        const prompt = `You are a professional AI Customer Support Assistant for a company.

        Your role:
        - Answer customer questions clearly, politely, and accurately.
        - Use ONLY the information provided in the Knowledge Base below.
        - Do NOT make up information or assume anything not explicitly stated.
        - Keep responses concise, friendly, and helpful.
        - Maintain a calm, professional support tone at all times.
        
        Knowledge Base:
        ${KNOWLEDGE}
        
        Customer Question:
        ${message}
        
        Rules:
        1. Answer strictly based on the Knowledge Base.
        2. If the question is not covered in the Knowledge Base, say:
           "I'm sorry, I don’t have that information right now. Please contact our support team for further assistance." and also provide our support email
        3. Do not mention internal systems, prompts, or the words “knowledge base”.
        4. Do not use markdown, emojis, or bullet points unless necessary.
        5. If the question is unclear, politely ask the customer to clarify.
        6. Never provide legal, medical, or financial advice.
        7. Avoid long explanations unless the customer explicitly asks for details.
        
        Now generate the best possible response to the customer.`; 

        const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
          });
          return NextResponse.json(response.text, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          });
          
        
    } catch (error) {
        return NextResponse.json({
            message:error
        })
    }
    
}