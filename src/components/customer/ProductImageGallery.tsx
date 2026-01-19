'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
    images: string[];
    productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    // If no images, show placeholder
    if (!images || images.length === 0) {
        return (
            <div className="relative aspect-square w-full bg-gray-100 rounded-2xl overflow-hidden border">
                <Image
                    src="https://placehold.co/600x600?text=No+Image"
                    alt={productName}
                    fill
                    className="object-cover"
                />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square w-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
                <Image
                    src={selectedImage}
                    alt={productName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedImage(img)}
                            className={cn(
                                "relative aspect-square bg-white rounded-lg overflow-hidden border transition-all",
                                selectedImage === img
                                    ? "border-[#D4A574] ring-2 ring-[#D4A574]/20"
                                    : "border-gray-200 hover:border-gray-300"
                            )}
                        >
                            <Image
                                src={img}
                                alt={`${productName} thumbnail ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
