'use client';

import { CheckoutForm } from '@/components/customer/CheckoutForm';
import { OrderSummary } from '@/components/customer/OrderSummary';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CheckoutPage() {
    const { items } = useCart();
    const router = useRouter();

    // Redirect if cart is empty
    useEffect(() => {
        if (items.length === 0) {
            router.push('/products');
        }
    }, [items, router]);

    if (items.length === 0) {
        return null; // Don't render anything while redirecting
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">Checkout</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <CheckoutForm />
                    </div>
                    <div className="md:col-span-1">
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </div>
    );
}
