import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request);
        const user = await Event.findOne({postedby: userID});
        return NextResponse.json({
            message: "User found",
            data: user
        });
    } catch (error: any) { 
        return NextResponse.json({error: error.message}, {status: 400});
    }
}