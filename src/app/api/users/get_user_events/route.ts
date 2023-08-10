import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Event from "@/models/eventModel";

connect();

export async function GET(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request);
        const events = await Event.find({postedby: userID})
        return NextResponse.json({
            message: "Events found",
            data: events
        });
    } catch (error: any) { 
        return NextResponse.json({error: error.message}, {status: 400});
    }
}