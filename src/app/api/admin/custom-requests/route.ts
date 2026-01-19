import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CustomCombo from '@/models/CustomCombo';

export async function GET(req: Request) {
    try {
        await dbConnect();
        // Sort by newest first
        const requests = await CustomCombo.find({}).sort({ createdAt: -1 });
        return NextResponse.json(requests);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
