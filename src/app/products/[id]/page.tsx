import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { ProductImageGallery } from '@/components/customer/ProductImageGallery';
import { ProductActions } from '@/components/customer/ProductActions';
import { ChevronRight, Share2, ShieldCheck, Truck } from 'lucide-react';
import { CategoryShowcase } from '@/components/customer/CategoryShowcase';

interface PageProps {
    params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
    await dbConnect();
    // Validate ID format if necessary or try/catch
    try {
        const product = await Product.findById(id).lean();
        if (!product) return null;
        // Convert _id to string for serialization
        return JSON.parse(JSON.stringify(product));
    } catch (e) {
        return null;
    }
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Breadcrumb */}
            <div className="bg-gray-50 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center text-sm text-gray-500">
                        <Link href="/" className="hover:text-[#D4A574]">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-2" />
                        <Link href="/products" className="hover:text-[#D4A574]">Shop</Link>
                        <ChevronRight className="h-4 w-4 mx-2" />
                        <span className="text-gray-900 font-medium truncate">{product.name}</span>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left Column - Gallery */}
                    <div>
                        <ProductImageGallery images={product.images} productName={product.name} />
                    </div>

                    {/* Right Column - Details */}
                    <div className="flex flex-col">
                        <div className="mb-2">
                            {product.categories && product.categories.length > 0 ? (
                                <div className="flex gap-2">
                                    {product.categories.map((cat: string) => (
                                        <span key={cat} className="text-xs font-bold text-[#D4A574] uppercase tracking-widest bg-[#D4A574]/10 px-2 py-1 rounded">
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <span className="text-xs font-bold text-[#D4A574] uppercase tracking-widest">
                                    {product.category || 'General'}
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
                            {product.name}
                        </h1>

                        <div className="flex items-end gap-4 mb-6">
                            <span className="text-3xl font-bold text-gray-900">
                                Rs. {product.price.toLocaleString()}
                            </span>
                            {/* Optional: Add compare price if we implement discounts later */}
                        </div>

                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <div className="border-t border-b border-gray-100 py-6 mb-8 space-y-4">
                            {product.items && product.items.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3">What's Included:</h3>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {product.items.map((item: string, idx: number) => (
                                            <li key={idx} className="flex items-center text-gray-600 text-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#D4A574] mr-2" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="mb-8">
                            <ProductActions product={product} />
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <Truck className="h-6 w-6 text-[#2C3E50]" />
                                <div>
                                    <p className="font-semibold text-sm">Islandwide Delivery</p>
                                    <p className="text-xs text-gray-500">Fast & Safe Shipping</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <ShieldCheck className="h-6 w-6 text-[#2C3E50]" />
                                <div>
                                    <p className="font-semibold text-sm">Quality Guarantee</p>
                                    <p className="text-xs text-gray-500">Premium Products Only</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products / Same Category */}
                <div className="mt-24">
                    {/* Show more from the first category of this product */}
                    <CategoryShowcase
                        category={product.categories?.[0] || product.category || 'birthday'}
                        title="You might also like"
                        description="More premium selections from this collection"
                        excludeId={String(product._id)}
                    />
                </div>
            </main>
        </div>
    );
}
