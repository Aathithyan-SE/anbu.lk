import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderItem {
    productId?: mongoose.Types.ObjectId;
    productName: string;
    quantity: number;
    price: number;
    customItems?: string[];
    image?: string;
}

export interface IOrder extends Document {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    shippingAddress: {
        street: string;
        city: string;
        postalCode: string;
        country: string;
    };
    items: {
        productId: string;
        productName: string;
        quantity: number;
        price: number;
        image?: string;
    }[];
    totalAmount: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    paymentStatus: 'Pending' | 'Paid' | 'Failed';
    note?: string;
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerEmail: { type: String },
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, default: 'Sri Lanka' },
    },
    items: [{
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String },
    }],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending'
    },
}, { timestamps: true });

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
