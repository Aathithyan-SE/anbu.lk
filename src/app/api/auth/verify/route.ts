import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('anbu_admin_token');

    if (!token) {
        return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    const decoded = verifyToken(token.value);

    if (!decoded) {
        return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    return NextResponse.json({ isAuthenticated: true, user: decoded }, { status: 200 });
}
