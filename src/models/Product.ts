import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    categories: string[];
    category?: string; // Legacy field support
    items: string[];
    price: number;
    images: string[];
    isActive: boolean;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    categories: { type: [String], default: [] },
    items: { type: [String], default: [] },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
