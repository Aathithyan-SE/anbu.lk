import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);

        // Filter Params
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        const isFeatured = searchParams.get('featured') === 'true';
        const exclude = searchParams.get('exclude');
        const minPrice = Number(searchParams.get('minPrice')) || 0;
        const maxPrice = Number(searchParams.get('maxPrice')) || 0;
        const isAdmin = searchParams.get('admin') === 'true';

        // Pagination Params
        const page = Number(searchParams.get('page')) || 1;
        const limit = Number(searchParams.get('limit')) || 12;
        const skip = (page - 1) * limit;

        let query: any = {};

        // 1. Category Filter
        if (category) {
            query.$or = [
                { category: category },
                { categories: category }
            ];
        }

        // 2. Search Filter (Case insensitive regex)
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // 3. Featured Filter
        if (isFeatured) {
            query.isFeatured = true;
        }

        // 4. Admin vs Public (Active status)
        if (!isAdmin) {
            query.isActive = true;
        }

        // 5. Exclude ID
        if (exclude) {
            query._id = { $ne: exclude };
        }

        // 6. Price Range
        if (minPrice > 0 || maxPrice > 0) {
            query.price = {};
            if (minPrice > 0) query.price.$gte = minPrice;
            if (maxPrice > 0) query.price.$lte = maxPrice;
        }

        // Execute Query with Pagination
        const total = await Product.countDocuments(query);
        const products = await Product.find(query)
            .sort({ createdAt: -1 }) // Default sort by newest
            .skip(skip)
            .limit(limit);

        return NextResponse.json({
            products,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                current: page,
                limit
            }
        });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('anbu_admin_token')?.value;

        if (!token || !verifyToken(token)) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();
        const product = await Product.create(body);

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error('Create product error:', error);
        return NextResponse.json({ message: 'Error creating product' }, { status: 500 });
    }
}
