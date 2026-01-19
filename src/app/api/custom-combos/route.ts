import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CustomCombo from '@/models/CustomCombo';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        const {
            customerName,
            customerPhone,
            customerEmail,
            budgetRange,
            occasion,
            recipientGender,
            description,
            preferences
        } = body;

        if (!customerName || !customerPhone || !budgetRange) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const customRequest = await CustomCombo.create({
            customerName,
            customerPhone,
            customerEmail,
            budgetRange,
            occasion,
            recipientGender,
            description,
            preferences,
            status: 'Pending'
        });

        return NextResponse.json({ success: true, data: customRequest }, { status: 201 });

    } catch (error) {
        console.error('Custom Combo request error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
