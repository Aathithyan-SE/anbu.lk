import { config } from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { hashPassword } from '../src/lib/auth'; // Ensure this path is correct
import Admin from '../src/models/Admin';

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

async function seedAdmin() {
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log('Connected to MongoDB');

        const adminEmail = 'superadmin@anbu.lk';
        const existingAdmin = await Admin.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        const hashedPassword = await hashPassword('Admin@123');

        await Admin.create({
            email: adminEmail,
            password: hashedPassword,
            role: 'superadmin'
        });

        console.log('Super Admin created successfully');
        console.log('Email: superadmin@anbu.lk');
        console.log('Password: Admin@123');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
}

seedAdmin();
