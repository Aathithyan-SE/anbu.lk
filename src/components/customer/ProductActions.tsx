'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, ShoppingBag, MessageCircle } from 'lucide-react';
import { IProduct } from '@/models/Product';
import { generateWhatsAppLink } from '@/lib/utils';
import { toast } from 'sonner';

interface ProductActionsProps {
    product: IProduct;
}

export function ProductActions({ product }: ProductActionsProps) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity(q => q + 1);
    const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    const handleAddToCart = () => {
        addToCart({
            id: String(product._id),
            name: product.name,
            price: product.price,
            image: product.images?.[0] || '',
            quantity: quantity
        });
        toast.success(`Added ${quantity} ${product.name} to cart`);
    };

    const handleWhatsApp = () => {
        // We'll create a dummy order structure just to reuse the util if possible,
        // or just construct a message for a single inquiry.
        // Let's make a custom message for inquiry.
        const message = `Hi, I'm interested in *${product.name}* (Rs. ${product.price.toLocaleString()}).\nIs it available?`;
        const url = `https://wa.me/94762287232?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <span className="text-gray-900 font-medium">Quantity</span>
                <div className="flex items-center border border-gray-300 rounded-full">
                    <button
                        onClick={decrement}
                        className="p-3 text-gray-600 hover:text-black transition-colors"
                        disabled={quantity <= 1}
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <button
                        onClick={increment}
                        className="p-3 text-gray-600 hover:text-black transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    size="lg"
                    className="flex-1 bg-[#2C3E50] hover:bg-[#1a252f] text-white rounded-full h-12 text-lg"
                    onClick={handleAddToCart}
                    disabled={!product.isActive}
                >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    {product.isActive ? 'Add to Cart' : 'Out of Stock'}
                </Button>

                <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-full h-12 text-lg"
                    onClick={handleWhatsApp}
                >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Inquire on WhatsApp
                </Button>
            </div>
        </div>
    );
}
