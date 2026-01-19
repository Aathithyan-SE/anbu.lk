'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useState } from "react";
import { OrderDetails } from "@/components/admin/OrderDetails";

interface OrderTableProps {
    orders: any[];
    refreshData: () => void;
}

export function OrderTable({ orders, refreshData }: OrderTableProps) {
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-500';
            case 'Processing': return 'bg-blue-500';
            case 'Shipped': return 'bg-purple-500';
            case 'Delivered': return 'bg-green-500';
            case 'Cancelled': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow key={order._id}>
                                    <TableCell className="font-medium">#{order._id.slice(-6).toUpperCase()}</TableCell>
                                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span>{order.customerName}</span>
                                            <span className="text-xs text-gray-500">{order.customerPhone}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={`${getStatusColor(order.status)} hover:${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">Rs. {order.totalAmount?.toLocaleString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                                            <Eye className="h-4 w-4 mr-2" />
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <OrderDetails
                order={selectedOrder}
                isOpen={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
                onUpdate={() => {
                    refreshData();
                    setSelectedOrder(null);
                }}
            />
        </>
    );
}
