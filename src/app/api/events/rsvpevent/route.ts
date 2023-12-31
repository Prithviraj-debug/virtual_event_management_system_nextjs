import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/eventModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
         const {eventId, email} = reqBody;
         
         const event = await Event.findOne({_id: eventId});
         if (!event) {
             return NextResponse.json({
                 message: "Invalid token",
                }, {status: 400});
            }
            
            console.log(event)            
            event.rsvp_users.push(email);
            await event.save();
            console.log(reqBody)
            
        return NextResponse.json({
            message: "rsvp'd",
            success: true
        });

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}