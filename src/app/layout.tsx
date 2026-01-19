import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/customer/Header';
import { Footer } from '@/components/customer/Footer';
import { CartDrawer } from '@/components/customer/CartDrawer';
import { CartProvider } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Anbu.lk - Premium Gift Combos',
    description: 'Sri Lanka\'s premier destination for curated gift combos and custom surprises.',
    icons: {
        icon: '/logo.ico',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={cn(outfit.className, "min-h-screen flex flex-col")}>
                <CartProvider>
                    <Header />
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer />
                    <CartDrawer />
                    <Toaster richColors position="top-right" />
                </CartProvider>
            </body>
        </html>
    );
}
