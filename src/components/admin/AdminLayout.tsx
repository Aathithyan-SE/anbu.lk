import { Sidebar } from '@/components/admin/Sidebar';

// Wrapper for Admin Layout to include Sidebar
export default function AdminLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8 md:p-12 pt-16 md:pt-12 bg-gray-50/50 min-h-screen">
                {children}
            </main>
        </div>
    );
}
