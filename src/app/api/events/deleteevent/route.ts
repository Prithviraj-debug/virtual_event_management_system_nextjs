import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/eventModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function DELETE(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { _id } = reqBody;

        console.log(reqBody)
        const eventDeleted = await Event.deleteOne({_id: _id});
        return NextResponse.json({
            message: "Event deleted",
            data: eventDeleted
        });
    } catch (error: any) { 
        return NextResponse.json({error: error.message}, {status: 400});
    }
}