import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function uploadToS3(file: File, folder: string) {
    const fileName = `${folder}/${Date.now()}-${file.name}`;
    // Convert File to Buffer/Uint8Array
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
    });

    await s3Client.send(command);
    // Construct the public URL
    return `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET}/${fileName}`;
}

export async function deleteFromS3(fileUrl: string) {
    try {
        const urlParts = fileUrl.split('.com/');
        if (urlParts.length < 2) return;

        const key = urlParts[1];
        const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: key,
        });

        await s3Client.send(command);
    } catch (error) {
        console.error('Error deleting from S3:', error);
    }
}
