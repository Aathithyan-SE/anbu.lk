'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { cartCount, setIsDrawerOpen } = useCart();

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/products', label: 'Shop Gifts' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 md:h-20 items-center justify-between">
                    <div className="flex-shrink-0 overflow-hidden">
                        <Link href="/">
                            <Image
                                src="/logo.png"
                                alt="Anbu.lk Logo"
                                width={180}
                                height={60}
                                className="h-10 md:h-12 w-auto object-contain"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-[#D4A574]",
                                    pathname === link.href ? "text-[#D4A574]" : "text-gray-700"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative text-gray-700 hover:text-[#D4A574]"
                            onClick={() => setIsDrawerOpen(true)}
                        >
                            <ShoppingBag className="h-5 w-5" />
                            {cartCount > 0 && (
                                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-[#D4A574] p-0 text-xs">
                                    {cartCount}
                                </Badge>
                            )}
                        </Button>

                        {/* Mobile Menu */}
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                <div className="flex flex-col space-y-4 mt-8">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "text-lg font-medium transition-colors hover:text-[#D4A574]",
                                                pathname === link.href ? "text-[#D4A574]" : "text-gray-700"
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                    <Link href="/cart" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full mt-4 bg-[#D4A574] hover:bg-[#c29668]">
                                            View Cart ({cartCount})
                                        </Button>
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
