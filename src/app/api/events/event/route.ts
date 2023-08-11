import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/eventModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {id} = reqBody;
        const event = await Event.findOne({_id: id});
        return NextResponse.json({
            message: "Event found",
            data: event
        });
    } catch (error: any) { 
        return NextResponse.json({error: error.message}, {status: 400});
    }
}