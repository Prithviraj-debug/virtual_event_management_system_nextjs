import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/eventModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const events = await Event.find();
        return NextResponse.json({
            message: "data found",
            data: events
        });
    } catch (error: any) { 
        return NextResponse.json({error: error.message}, {status: 400});
    }
}