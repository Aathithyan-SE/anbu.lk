import { NextResponse } from 'next/server';
import { uploadToS3 } from '@/lib/s3';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        // Auth check
        const cookieStore = await cookies();
        const token = cookieStore.get('anbu_admin_token')?.value;

        if (!token || !verifyToken(token)) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File;
        const folder = formData.get('folder') as string || 'products';

        if (!file) {
            return NextResponse.json({ message: 'No file provided' }, { status: 400 });
        }

        const imageUrl = await uploadToS3(file, folder);

        return NextResponse.json({ imageUrl }, { status: 200 });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ message: 'Upload failed' }, { status: 500 });
    }
}
