import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICustomCombo extends Document {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    budgetRange: string;
    occasion: string;
    recipientGender?: string;
    description?: string;
    preferences?: string[];
    status: 'Pending' | 'Contacted' | 'Completed' | 'Cancelled';
    createdAt: Date;
    updatedAt: Date;
}

const CustomComboSchema: Schema = new Schema({
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerEmail: { type: String },
    budgetRange: { type: String, required: true },
    occasion: { type: String, required: true },
    recipientGender: { type: String },
    description: { type: String },
    preferences: { type: [String], default: [] },
    status: { type: String, enum: ['Pending', 'Contacted', 'Completed', 'Cancelled'], default: 'Pending' },
}, { timestamps: true });

const CustomCombo: Model<ICustomCombo> = mongoose.models.CustomCombo || mongoose.model<ICustomCombo>('CustomCombo', CustomComboSchema);

export default CustomCombo;
