'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploaderProps {
    images: string[];
    onChange: (images: string[]) => void;
    folder?: string;
    maxFiles?: number;
}

export function ImageUploader({ images, onChange, folder = 'products', maxFiles = 5 }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (images.length >= maxFiles) {
            alert(`Maximum ${maxFiles} images allowed`);
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            onChange([...images, data.imageUrl]);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        onChange(newImages);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
                {images.map((url, index) => (
                    <div key={url} className="relative w-32 h-32 border rounded-lg overflow-hidden group">
                        <Image
                            src={url}
                            alt={`Product image ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ))}
                <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 relative">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        disabled={uploading}
                    />
                    {uploading ? (
                        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                    ) : (
                        <Upload className="h-6 w-6 text-gray-400" />
                    )}
                </div>
            </div>
        </div>
    );
}
