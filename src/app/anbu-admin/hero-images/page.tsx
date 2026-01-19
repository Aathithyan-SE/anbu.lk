import { HeroImageManager } from '@/components/admin/HeroImageManager';

export default function HeroImagesPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Hero Banners</h1>
            <p className="text-gray-500">Manage the sliding banners on the home page.</p>

            <HeroImageManager />
        </div>
    );
}
