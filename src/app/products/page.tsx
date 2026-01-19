'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/customer/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { IProduct } from '@/models/Product';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>}>
            <ProductListingContent />
        </Suspense>
    );
}

function ProductListingContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ total: 0, pages: 1, current: 1 });

    // Filter States (synced with URL)
    const currentSearch = searchParams.get('search') || '';
    const currentCategory = searchParams.get('category') || null;
    const currentPage = Number(searchParams.get('page')) || 1;

    // Local state for search input to avoid debounce lag
    const [searchTerm, setSearchTerm] = useState(currentSearch);

    useEffect(() => {
        fetchProducts();
    }, [searchParams]); // Re-fetch when URL params change

    const fetchProducts = async () => {
        setLoading(true);
        try {
            // Construct query string from current URL params
            const query = new URLSearchParams(searchParams.toString());
            // Ensure defaults
            if (!query.has('page')) query.set('page', '1');
            if (!query.has('limit')) query.set('limit', '12');

            const res = await fetch(`/api/products?${query.toString()}`);
            const data = await res.json();

            // Handle both legacy array response and new paginated response for safety
            if (Array.isArray(data)) {
                setProducts(data);
                setPagination({ total: data.length, pages: 1, current: 1 });
            } else {
                setProducts(data.products || []);
                setPagination(data.pagination || { total: 0, pages: 1, current: 1 });
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    // Debounce search updates
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // Only update if the search term has actually changed from what's in the URL
            if (searchTerm !== currentSearch) {
                updateFilter('search', searchTerm);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    // Update URL helper
    const updateFilter = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        // Reset to page 1 on filter change
        if (key !== 'page') {
            params.set('page', '1');
        }
        router.push(`/products?${params.toString()}`);
    };

    // Removed manual handleSearch and handleKeyDown as they are now handled by the effect, 
    // but keeping handleKeyDown for immediate "Enter" if desired (optional, but effect covers it)
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            // Immediate update on Enter, canceling the debounce
            updateFilter('search', searchTerm);
        }
    };

    const categories = ['birthday', 'anniversary', 'love', 'congrats', 'presets'];

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header and Filters */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">All Gift Combos</h1>
                        <p className="text-gray-500">Explore our curated collection of premium gifts.</p>
                    </div>

                    <div className="flex gap-2">
                        <div className="relative w-full md:w-64">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                            />
                            <Input
                                placeholder="Search gifts..."
                                className="pl-9 bg-white"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="bg-white">
                                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                                    {currentCategory ? capitalize(currentCategory) : 'Filter'}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Category</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => updateFilter('category', null)}>
                                    All Categories
                                </DropdownMenuItem>
                                {categories.map(cat => (
                                    <DropdownMenuItem
                                        key={cat}
                                        onClick={() => updateFilter('category', cat)}
                                        className="capitalize"
                                    >
                                        {cat === 'presets' ? 'Curated Boxes' : cat}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Active Filters Display */}
                {(currentSearch || currentCategory) && (
                    <div className="flex gap-2 mb-6">
                        {currentCategory && (
                            <div className="bg-white border px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                <span className="text-gray-500">Category:</span>
                                <span className="font-medium capitalize">{currentCategory}</span>
                                <button onClick={() => updateFilter('category', null)} className="hover:text-red-500">×</button>
                            </div>
                        )}
                        {currentSearch && (
                            <div className="bg-white border px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                <span className="text-gray-500">Search:</span>
                                <span className="font-medium">"{currentSearch}"</span>
                                <button onClick={() => { setSearchTerm(''); updateFilter('search', null); }} className="hover:text-red-500">×</button>
                            </div>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => router.push('/products')} className="text-xs">
                            Clear All
                        </Button>
                    </div>
                )}

                {/* Product Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <Loader2 className="animate-spin h-10 w-10 text-[#D4A574] mx-auto" />
                        <p className="mt-4 text-gray-500">Loading treasures...</p>
                    </div>
                ) : products.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                            {products.map((product) => (
                                <ProductCard key={String(product._id)} product={product} />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {pagination.pages > 1 && (
                            <div className="mt-12 flex justify-center items-center gap-4">
                                <Button
                                    variant="outline"
                                    onClick={() => updateFilter('page', String(currentPage - 1))}
                                    disabled={currentPage <= 1}
                                >
                                    <ChevronLeft className="h-4 w-4 mr-2" />
                                    Previous
                                </Button>
                                <span className="text-sm font-medium">
                                    Page {pagination.current} of {pagination.pages}
                                </span>
                                <Button
                                    variant="outline"
                                    onClick={() => updateFilter('page', String(currentPage + 1))}
                                    disabled={currentPage >= pagination.pages}
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4 ml-2" />
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed">
                        <p className="text-gray-500">No products found matching your criteria.</p>
                        <Button
                            variant="link"
                            onClick={() => router.push('/products')}
                            className="text-[#D4A574]"
                        >
                            Clear filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
