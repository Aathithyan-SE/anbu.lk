'use client';

import { useEffect, useState } from 'react';
import { IProduct } from '@/models/Product';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CategoryShowcaseProps {
    category: string;
    title: string;
    description?: string;
    color?: string; // Optional accent color class
    excludeId?: string;
}

export function CategoryShowcase({ category, title, description, color = 'bg-white', excludeId }: CategoryShowcaseProps) {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                let url = `/api/products?category=${category}&limit=4`;
                if (excludeId) {
                    url += `&exclude=${excludeId}`;
                }
                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    setProducts(Array.isArray(data) ? data : data.products);
                }
            } catch (error) {
                console.error(`Failed to fetch products for ${category}`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryProducts();
    }, [category]);

    if (!loading && products.length === 0) return null;

    return (
        <section className={`py-16 ${color}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2 capitalize">{title}</h2>
                        {description && <p className="text-gray-500 max-w-2xl">{description}</p>}
                    </div>

                    <Link href={`/products?category=${category}`} className="text-[#D4A574] font-medium flex items-center hover:underline">
                        View More {title} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="h-96 bg-gray-100 animate-pulse rounded-xl"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {products.map((product) => (
                            <ProductCard key={String(product._id)} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
