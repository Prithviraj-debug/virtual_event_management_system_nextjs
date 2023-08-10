import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function DELETE(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { event } = reqBody;

        const eventDeleted = await Event.deleteOne({_id: event});
        return NextResponse.json({
            message: "Event deleted",
            data: eventDeleted
        });
    } catch (error: any) { 
        return NextResponse.json({error: error.message}, {status: 400});
    }
}