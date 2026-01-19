import { HeroSection } from '@/components/customer/HeroSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Gift, Heart, Star } from 'lucide-react';
import Image from 'next/image';
import { FeaturedSection } from '@/components/customer/FeaturedSection';
import { CategoryShowcase } from '@/components/customer/CategoryShowcase';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <HeroSection />

            {/* Dynamic Featured Section */}
            <FeaturedSection />

            {/* Dynamic Category Sections */}
            <CategoryShowcase
                category="birthday"
                title="Birthday Celebrations"
                description="Make their special day extra memorable with our curated birthday collections."
                color="bg-white"
            />

            <CategoryShowcase
                category="anniversary"
                title="Anniversary Specials"
                description="Celebrate your enduring love with gifts that speak from the heart."
                color="bg-gray-50"
            />

            <CategoryShowcase
                category="love"
                title="Love & Romance"
                description="Express your deepest feelings with our romantic gift sets."
                color="bg-white"
            />


        </div>
    );
}
