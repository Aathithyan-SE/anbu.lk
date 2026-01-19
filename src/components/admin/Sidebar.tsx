'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Image as ImageIcon,
    MessageSquare,
    LogOut,
    Menu
} from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
    {
        title: 'Dashboard',
        href: '/anbu-admin/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Products',
        href: '/anbu-admin/products',
        icon: Package,
    },
    {
        title: 'Orders',
        href: '/anbu-admin/orders',
        icon: ShoppingBag,
    },
    {
        title: 'Hero Images',
        href: '/anbu-admin/hero-images',
        icon: ImageIcon,
    },
    {
        title: 'Custom Requests',
        href: '/anbu-admin/custom-requests',
        icon: MessageSquare,
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    // Logout function usually involves clearing cookie/local storage and redirect
    // For now we will just use a link to logout or client side handler
    const handleLogout = async () => {
        // Basic cookie clearing logic would go here or call an API endpoint
        // document.cookie = 'anbu_admin_token=; Max-Age=0; path=/';
        // window.location.href = '/anbu-admin/login';
        // For cleaner approach, call invalidation endpoint if exists, or rely on client side cookie delete if accessible
    };

    const NavContent = () => (
        <div className="flex flex-col h-full py-4">
            <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    Anbu Admin
                </h2>
                <div className="space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                        >
                            <Button
                                variant={pathname === item.href ? 'secondary' : 'ghost'}
                                className="w-full justify-start"
                            >
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.title}
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="mt-auto px-3">
                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden border-r bg-gray-100/40 md:block md:w-64 h-screen sticky top-0">
                <NavContent />
            </div>

            {/* Mobile Sidebar */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-40">
                        <Menu className="h-4 w-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                    <NavContent />
                </SheetContent>
            </Sheet>
        </>
    );
}
