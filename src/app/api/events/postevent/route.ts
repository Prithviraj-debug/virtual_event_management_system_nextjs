import {connect} from "@/dbConfig/dbConfig";
import Event from '@/models/eventModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const {postedby, eventname, organizer, date, time, url, category} = reqbody;
        console.log(reqbody);

        // create new Event
        const newEvent = new Event({
            postedby,
            eventname,
            organizer,
            date,
            time,
            url,
            category
        });

        // save event and return response
        const savedEvent = await newEvent.save();
        console.log(savedEvent);

        return NextResponse.json({
            message: 'Event created successfully', 
            status: 201
        });

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}