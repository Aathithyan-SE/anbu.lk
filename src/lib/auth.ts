import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function hashPassword(password: string) {
    return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, {
        expiresIn: (process.env.JWT_EXPIRATION || '1d') as jwt.SignOptions['expiresIn'],
    });
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
        return null;
    }
}
