'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImageUploader } from './ImageUploader';
import { Loader2, Plus, X } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IProduct } from '@/models/Product';

interface ProductFormProps {
    initialData?: IProduct & { category?: string };
}

export function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        description: initialData?.description || '',
        price: initialData?.price || 0,
        // Fallback to old category field if categories is empty/undefined
        categories: initialData?.categories?.length ? initialData.categories : (initialData?.category ? [initialData.category] : []),
        items: initialData?.items || [],
        images: initialData?.images || [],
        isActive: initialData?.isActive ?? true,
        isFeatured: initialData?.isFeatured ?? false,
    });
    const [newItem, setNewItem] = useState('');

    const handleChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const addItem = () => {
        if (newItem.trim()) {
            setFormData({
                ...formData,
                items: [...formData.items, newItem.trim()]
            });
            setNewItem('');
        }
    };

    const removeItem = (index: number) => {
        const newItems = [...formData.items];
        newItems.splice(index, 1);
        setFormData({ ...formData, items: newItems });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = initialData
                ? `/api/products/${initialData._id}`
                : '/api/products';

            const method = initialData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed to save product');

            router.push('/anbu-admin/products');
            router.refresh();
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            <Card>
                <CardContent className="pt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Categories</Label>
                            <div className="grid grid-cols-2 gap-2 mt-2 border p-4 rounded-md">
                                {['birthday', 'anniversary', 'love', 'congrats', 'presets'].map((cat) => (
                                    <div key={cat} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id={`cat-${cat}`}
                                            checked={formData.categories.includes(cat)}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                setFormData(prev => ({
                                                    ...prev,
                                                    categories: checked
                                                        ? [...prev.categories, cat]
                                                        : prev.categories.filter(c => c !== cat)
                                                }));
                                            }}
                                            className="h-4 w-4 rounded border-gray-300 text-[#D4A574] focus:ring-[#D4A574]"
                                        />
                                        <Label htmlFor={`cat-${cat}`} className="capitalize cursor-pointer">
                                            {cat === 'presets' ? 'Curated Boxes' : cat}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-4">
                        <input
                            type="checkbox"
                            id="isFeatured"
                            checked={formData.isFeatured}
                            onChange={(e) => handleChange('isFeatured', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-[#D4A574] focus:ring-[#D4A574]"
                        />
                        <Label htmlFor="isFeatured" className="cursor-pointer font-medium">Mark as Featured Product</Label>

                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="price">Price (LKR)</Label>
                        <Input
                            id="price"
                            type="number"
                            value={formData.price}
                            onChange={(e) => handleChange('price', Number(e.target.value))}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Included Items</Label>
                        <div className="flex gap-2">
                            <Input
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                placeholder="Add item (e.g. Chocolates, Card)"
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem())}
                            />
                            <Button type="button" onClick={addItem}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.items.map((item, idx) => (
                                <div key={idx} className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2 text-sm">
                                    {item}
                                    <button type="button" onClick={() => removeItem(idx)} className="text-gray-500 hover:text-red-500">
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Images</Label>
                        <ImageUploader
                            images={formData.images}
                            onChange={(imgs) => handleChange('images', imgs)}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? 'Update Product' : 'Create Product'}
                </Button>
            </div>
        </form >
    );
}
