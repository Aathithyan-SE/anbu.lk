'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Slide {
    _id: string;
    imageUrl: string;
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
}

export function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState<Slide[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const res = await fetch('/api/hero-images');
                if (res.ok) {
                    const data = await res.json();
                    if (data.length > 0) {
                        setSlides(data);
                    } else {
                        // Fallback slides if no API data
                        setSlides([
                            {
                                _id: '1',
                                imageUrl: 'https://placehold.co/1920x600/2C3E50/FFF?text=Welcome+to+Anbu.lk',
                                title: 'The Perfect Gift',
                                subtitle: 'Curated boxes for every occasion',
                                ctaText: 'Shop Now',
                                ctaLink: '/products'
                            }
                        ]);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch hero slides', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSlides();
    }, []);

    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    if (loading) {
        return (
            <div className="relative h-[500px] md:h-[600px] w-full bg-gray-100 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (slides.length === 0) return null;

    return (
        <section className="relative h-[250px] sm:h-[400px] md:h-[600px] w-full overflow-hidden bg-gray-900">
            {slides.map((slide, index) => (
                <div
                    key={slide._id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <Image
                        src={slide.imageUrl}
                        alt={slide.title || 'Hero Banner'}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                    {/* Dark overlay for better text readability */}
                    {slide.title && (
                        <div className="absolute inset-0 bg-black/40" />
                    )}

                    <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                        {slide.title && (
                            <div className="max-w-3xl transform transition-all duration-700 translate-y-0 opacity-100">
                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">
                                    {slide.title}
                                </h1>
                                {slide.subtitle && (
                                    <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-sm">
                                        {slide.subtitle}
                                    </p>
                                )}
                                {slide.ctaText && slide.ctaLink && (
                                    <Link href={slide.ctaLink}>
                                        <Button
                                            size="lg"
                                            className="bg-[#D4A574] hover:bg-[#c29668] text-white border-none rounded-full px-8 py-6 text-lg font-medium transition-all hover:scale-105 shadow-lg"
                                        >
                                            {slide.ctaText}
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-all z-10"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-all z-10"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
