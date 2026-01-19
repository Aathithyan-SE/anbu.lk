'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/utils';

export function CheckoutForm() {
    const { items, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        note: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (items.length === 0) return;
        setLoading(true);

        try {
            // 1. Create order in DB
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerName: formData.name,
                    customerPhone: formData.phone,
                    customerEmail: formData.email,
                    shippingAddress: {
                        street: formData.address,
                        city: formData.city,
                        postalCode: formData.postalCode,
                    },
                    items: items.map(item => ({
                        productId: item.id,
                        productName: item.name, // Sending name for redundancy/easy reading in generic Order model
                        quantity: item.quantity,
                        price: item.price
                    })),
                    totalAmount: cartTotal,
                    note: formData.note
                })
            });

            if (!res.ok) throw new Error('Failed to create order');

            const { data: order } = await res.json();

            // 2. Clear Cart
            clearCart();

            // 3. Redirect to WhatsApp
            const waLink = generateWhatsAppLink(order);
            window.location.href = waLink;

        } catch (error) {
            console.error('Checkout error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg border p-6 space-y-6">
            <h2 className="text-xl font-semibold mb-6">Contact & Shipping Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                        id="name" name="name" required
                        value={formData.name} onChange={handleChange}
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                        id="phone" name="phone" required type="tel"
                        value={formData.phone} onChange={handleChange}
                        placeholder="+94 77 123 4567"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email Address (Optional)</Label>
                <Input
                    id="email" name="email" type="email"
                    value={formData.email} onChange={handleChange}
                    placeholder="john@example.com"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Textarea
                    id="address" name="address" required
                    value={formData.address} onChange={handleChange}
                    placeholder="No. 123, Main Street"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                        id="city" name="city" required
                        value={formData.city} onChange={handleChange}
                        placeholder="Colombo"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                        id="postalCode" name="postalCode"
                        value={formData.postalCode} onChange={handleChange}
                        placeholder="00100"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="note">Order Notes (Optional)</Label>
                <Textarea
                    id="note" name="note"
                    value={formData.note} onChange={handleChange}
                    placeholder="Any special instructions or message for the card..."
                />
            </div>

            <Button
                type="submit"
                className="w-full bg-[#D4A574] hover:bg-[#c29668] text-white h-12 text-lg mt-8"
                disabled={loading || items.length === 0}
            >
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                    </>
                ) : (
                    'Place Order on WhatsApp'
                )}
            </Button>

            <p className="text-xs text-center text-gray-500 mt-4">
                By placing this order, you will be redirected to WhatsApp to confirm details with our team.
            </p>
        </form>
    );
}
