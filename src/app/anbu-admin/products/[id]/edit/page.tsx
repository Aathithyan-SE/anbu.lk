'use client';

import { useEffect, useState, use } from 'react';
import { ProductForm } from '@/components/admin/ProductForm';
import { IProduct } from '@/models/Product';
import { Loader2 } from 'lucide-react';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`/api/products/${resolvedParams.id}`);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [resolvedParams.id]);

    if (loading) {
        return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin" /></div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
            <ProductForm initialData={product} />
        </div>
    );
}
