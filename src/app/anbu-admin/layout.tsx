import AdminLayoutWrapper from "@/components/admin/AdminLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Portal | Anbu.lk",
    description: "Administrative access for Anbu.lk",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminLayoutWrapper>
            {children}
        </AdminLayoutWrapper>
    );
}
