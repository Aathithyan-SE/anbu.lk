'use client';

import { useEffect, useState } from 'react';
import { IProduct } from '@/models/Product';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export function FeaturedSection() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await fetch('/api/products?featured=true&limit=4');
                if (res.ok) {
                    const data = await res.json();
                    setProducts(Array.isArray(data) ? data : data.products);
                }
            } catch (error) {
                console.error('Failed to fetch featured products', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    if (loading) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
            </section>
        );
    }

    if (products.length === 0) return null;

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Combos</h2>
                        <p className="text-gray-500">Handpicked favorites loved by our customers.</p>
                    </div>
                    <Link href="/products?featured=true">
                        <Button variant="outline" className="hidden md:flex">View All Featured</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {products.map((product) => (
                        <ProductCard key={String(product._id)} product={product} />
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/products?featured=true">
                        <Button variant="outline" className="w-full">View All Featured</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
