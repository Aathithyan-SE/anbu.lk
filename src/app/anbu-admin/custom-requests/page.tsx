'use client';

import { useEffect, useState } from "react";
import { CustomRequestTable } from "@/components/admin/CustomRequestTable";
import { Loader2 } from "lucide-react";

export default function CustomRequestsPage() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const res = await fetch('/api/admin/custom-requests');
            const data = await res.json();
            setRequests(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Custom Requests</h1>
            </div>

            {loading ? (
                <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
            ) : (
                <CustomRequestTable requests={requests} />
            )}
        </div>
    );
}
