import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import HeroImage from '@/models/HeroImage';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const images = await HeroImage.find({ isActive: true }).sort({ order: 1 });
        return NextResponse.json(images);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const newImage = await HeroImage.create(body);
        return NextResponse.json(newImage, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
