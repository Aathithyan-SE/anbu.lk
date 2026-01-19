'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCart } from '@/context/CartContext';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function CartDrawer() {
    const { items, removeFromCart, updateQuantity, cartTotal, isDrawerOpen, setIsDrawerOpen } = useCart();

    return (
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <SheetContent className="flex flex-col w-full sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle className="flex items-center">
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Your Cart ({items.length})
                    </SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="bg-gray-100 p-6 rounded-full">
                            <ShoppingBag className="h-10 w-10 text-gray-400" />
                        </div>
                        <p className="text-muted-foreground">Your cart is empty.</p>
                        <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
                            Continue Shopping
                        </Button>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 -mx-6 px-6">
                            <div className="space-y-6 py-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 border">
                                            <Image
                                                src={item.image || 'https://placehold.co/100x100'}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col flex-1 justify-between">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-medium line-clamp-2 text-sm">{item.name}</h4>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <div className="flex items-center border rounded-md">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:bg-gray-100"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="text-xs w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:bg-gray-100"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>
                                                <p className="font-semibold text-sm">
                                                    Rs. {(item.price * item.quantity).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <SheetFooter className="border-t pt-6">
                            <div className="w-full space-y-4">
                                <div className="flex items-center justify-between text-base font-medium">
                                    <span>Total</span>
                                    <span>Rs. {cartTotal.toLocaleString()}</span>
                                </div>
                                <Link href="/checkout" onClick={() => setIsDrawerOpen(false)}>
                                    <Button className="w-full bg-[#D4A574] hover:bg-[#c29668]" size="lg">
                                        Proceed to Checkout
                                    </Button>
                                </Link>
                                <div className="text-center">
                                    <span
                                        className="text-xs text-muted-foreground cursor-pointer underline"
                                        onClick={() => setIsDrawerOpen(false)}
                                    >
                                        Or continue shopping
                                    </span>
                                </div>
                            </div>
                        </SheetFooter>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
