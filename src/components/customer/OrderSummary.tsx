'use client';

import { useCart } from '@/context/CartContext';
import { Separator } from '@/components/ui/separator';

export function OrderSummary() {
    const { items, cartTotal } = useCart();

    return (
        <div className="bg-white rounded-lg border p-6 h-fit sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-4 mb-4 text-sm">
                {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                        <div className="flex-1 pr-4">
                            <span className="font-medium text-gray-900">{item.name}</span>
                            <p className="text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-medium text-gray-900">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-medium">To be confirmed</span>
                </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <span className="font-bold text-lg text-[#D4A574]">Total</span>
                <span className="font-bold text-lg">Rs. {cartTotal.toLocaleString()}</span>
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
                Shipping costs will be calculated and confirmed via WhatsApp.
            </p>
        </div>
    );
}
