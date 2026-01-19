'use client';

import { useState, useEffect } from 'react';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Loader2, Plus } from 'lucide-react';
import Image from 'next/image';

interface IHeroImage {
    _id: string;
    imageUrl: string;
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
}

export function HeroImageManager() {
    const [images, setImages] = useState<IHeroImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [createLoading, setCreateLoading] = useState(false);

    // Form State
    const [newBanner, setNewBanner] = useState({
        imageUrl: '',
        title: '',
        subtitle: '',
        ctaText: 'Shop Now',
        ctaLink: '/products'
    });

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await fetch('/api/hero-images');
            const data = await res.json();
            setImages(data);
        } catch (error) {
            console.error('Failed to fetch hero images', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!newBanner.imageUrl) return alert('Please upload an image first');

        setCreateLoading(true);
        try {
            const res = await fetch('/api/hero-images', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBanner)
            });

            if (res.ok) {
                setNewBanner({
                    imageUrl: '',
                    title: '',
                    subtitle: '',
                    ctaText: 'Shop Now',
                    ctaLink: '/products'
                });
                fetchImages();
            }
        } catch (error) {
            console.error('Failed to create banner', error);
        } finally {
            setCreateLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to remove this banner?')) return;

        try {
            const res = await fetch(`/api/hero-images/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setImages(prev => prev.filter(img => img._id !== id));
            }
        } catch (error) {
            alert('Failed to delete image');
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
                <h2 className="text-lg font-semibold">Add New Banner</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label>Banner Image (Recommended: 1920x600px)</Label>
                        <div className="mt-2">
                            <ImageUploader
                                images={newBanner.imageUrl ? [newBanner.imageUrl] : []}
                                onChange={(urls) => setNewBanner({ ...newBanner, imageUrl: urls[0] || '' })}
                                maxFiles={1}
                                folder="hero-banners"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Title (Optional)</Label>
                            <Input
                                value={newBanner.title}
                                onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                                placeholder="e.g. Summer Sale"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Subtitle (Optional)</Label>
                            <Input
                                value={newBanner.subtitle}
                                onChange={(e) => setNewBanner({ ...newBanner, subtitle: e.target.value })}
                                placeholder="e.g. 50% Off Selected Items"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>CTA Text</Label>
                                <Input
                                    value={newBanner.ctaText}
                                    onChange={(e) => setNewBanner({ ...newBanner, ctaText: e.target.value })}
                                    placeholder="Shop Now"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>CTA Link</Label>
                                <Input
                                    value={newBanner.ctaLink}
                                    onChange={(e) => setNewBanner({ ...newBanner, ctaLink: e.target.value })}
                                    placeholder="/products"
                                />
                            </div>
                        </div>

                        <Button
                            onClick={handleCreate}
                            disabled={createLoading || !newBanner.imageUrl}
                            className="w-full"
                        >
                            {createLoading ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2 h-4 w-4" />}
                            Add Banner
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Current Banners</h2>
                {loading ? (
                    <Loader2 className="animate-spin text-gray-400" />
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {images.map((img) => (
                            <div key={img._id} className="group relative bg-white rounded-lg overflow-hidden border shadow-sm flex flex-col md:flex-row h-auto md:h-48">
                                <div className="relative w-full md:w-1/3 h-48 md:h-full bg-gray-100">
                                    <Image
                                        src={img.imageUrl}
                                        alt={img.title || 'Banner'}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-4 flex flex-col justify-center flex-grow space-y-1">
                                    {img.title ? (
                                        <>
                                            <h3 className="font-bold text-lg">{img.title}</h3>
                                            <p className="text-gray-500">{img.subtitle}</p>
                                            <div className="pt-2">
                                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                    Link: {img.ctaLink} ({img.ctaText})
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-gray-400 italic">Image Only (No Overlay)</p>
                                    )}
                                </div>
                                <div className="p-4 flex items-center justify-center border-l bg-gray-50">
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(img._id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {!loading && images.length === 0 && (
                    <p className="text-gray-500 italic text-center py-8">No banners active.</p>
                )}
            </div>
        </div>
    );
}
