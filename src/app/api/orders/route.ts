import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        const {
            customerName,
            customerPhone,
            customerEmail,
            shippingAddress,
            items,
            totalAmount,
            note
        } = body;

        // Basic validation
        if (!customerName || !customerPhone || !items || items.length === 0) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create Order
        const order = await Order.create({
            customerName,
            customerPhone,
            customerEmail,
            shippingAddress,
            items: items.map((item: any) => ({
                productId: item.id || item.productId,
                productName: item.name || item.productName,
                quantity: item.quantity,
                price: item.price,
                image: item.image
            })),
            totalAmount,
            status: 'Pending',
            paymentStatus: 'Pending',
            note
        });

        return NextResponse.json({ success: true, data: order }, { status: 201 });

    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
