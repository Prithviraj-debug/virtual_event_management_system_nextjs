import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/eventModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function DELETE(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id } = reqBody;

        console.log(reqBody);

        // Find the existing event by its ID
        const existingEvent = await Event.findById(id);
        if (!existingEvent) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        // Delete the event
        await existingEvent.remove();
        console.log('Event deleted:', id);

        return NextResponse.json({
            message: 'Event deleted successfully',
            status: 200
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id, eventname, organizer, date, time, url, category } = reqBody;

        console.log(reqBody);

        // Find the existing event by its ID
        const existingEvent = await Event.findById(id);
        if (!existingEvent) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        // Update the event properties
        existingEvent.eventname = eventname;
        existingEvent.organizer = organizer;
        existingEvent.date = date;
        existingEvent.time = time;
        existingEvent.url = url;
        existingEvent.category = category;
        existingEvent.rsvp_users = [];

        // Save the updated event and return response
        const updatedEvent = await existingEvent.save();
        console.log(updatedEvent);

        return NextResponse.json({
            message: 'Event updated successfully',
            status: 200,
            data: updatedEvent
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}