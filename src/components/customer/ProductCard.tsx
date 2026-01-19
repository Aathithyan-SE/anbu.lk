'use client';

import { IProduct } from '@/models/Product';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    // Determine primary image or placeholder
    const imageUrl = product.images?.[0] || 'https://placehold.co/400x400';
    // If IProduct is loaded from API JSON, _id is string. If from Mongoose document, it's ObjectId.
    // We assume basic JSON structure here.

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation
        addToCart({
            id: String(product._id),
            name: product.name,
            price: product.price,
            image: imageUrl,
            quantity: 1
        });
    };

    return (
        <Link href={`/products/${product._id}`} className="block h-full group">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col h-full">
                <div className="relative h-32 md:h-64 w-full bg-gray-100 overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {!product.isActive && (
                        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                            <span className="bg-red-500 text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-sm font-medium">
                                Out of Stock
                            </span>
                        </div>
                    )}
                </div>

                <div className="p-2 md:p-4 flex flex-col flex-grow">
                    <div className="flex-grow">
                        <p className="text-[10px] md:text-xs text-gray-500 mb-0.5 uppercase tracking-wider truncate">
                            {product.categories?.length > 0 ? product.categories.join(', ') : product.category}
                        </p>
                        <h3 className="font-semibold text-xs md:text-lg mb-1 group-hover:text-[#D4A574] transition-colors line-clamp-2 md:line-clamp-1 leading-tight md:leading-normal">
                            {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-3 line-clamp-2 hidden md:block">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-1 md:mt-2 gap-1.5 md:gap-2">
                        <span className="font-bold text-xs md:text-lg">Rs. {product.price.toLocaleString()}</span>
                        <Button
                            size="sm"
                            className="bg-[#2C3E50] hover:bg-[#1a252f] rounded-full px-2 md:px-4 h-7 md:h-9 text-[10px] md:text-sm"
                            disabled={!product.isActive}
                            onClick={handleAddToCart}
                        >
                            <ShoppingBag className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                            Add
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
