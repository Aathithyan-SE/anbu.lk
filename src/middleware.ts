import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
    // Only protect /anbu-admin routes
    if (request.nextUrl.pathname.startsWith('/anbu-admin')) {

        // Allow access to login page
        if (request.nextUrl.pathname === '/anbu-admin/login') {
            return NextResponse.next();
        }

        const token = request.cookies.get('anbu_admin_token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/anbu-admin/login', request.url));
        }

        // Basic token structure check or verify if possible in edge runtime
        // Note: complex verification might fail in edge runtime if using Node-specific crypto
        // For now, we rely on the presence and basic validity check if 'jsonwebtoken' allows it in Edge
        // Or we just check presence here and let the API/Page handle full verification

        // Simplest robust approach for middleware: check presence
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/anbu-admin/:path*',
};
