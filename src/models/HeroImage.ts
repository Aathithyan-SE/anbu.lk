import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHeroImage extends Document {
    imageUrl: string;
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    order: number;
    isActive: boolean;
}

const HeroImageSchema: Schema = new Schema({
    imageUrl: { type: String, required: true },
    title: { type: String },
    subtitle: { type: String },
    ctaText: { type: String },
    ctaLink: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Force delete model to allow schema changes in development hot-reload
if (mongoose.models.HeroImage) {
    delete mongoose.models.HeroImage;
}

const HeroImage: Model<IHeroImage> = mongoose.model<IHeroImage>('HeroImage', HeroImageSchema);

export default HeroImage;
