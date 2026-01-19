'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface OrderDetailsProps {
    order: any;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void;
}

export function OrderDetails({ order, isOpen, onClose, onUpdate }: OrderDetailsProps) {
    const [updating, setUpdating] = useState(false);

    if (!order) return null;

    const handleStatusChange = async (newStatus: string) => {
        setUpdating(true);
        try {
            await fetch(`/api/admin/orders/${order._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            onUpdate();
        } catch (error) {
            console.error('Failed to update status', error);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <span>Order #{order._id.slice(-6).toUpperCase()}</span>
                        <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                            {order.status}
                        </Badge>
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">

                    {/* Customer Info */}
                    <div>
                        <h3 className="font-semibold mb-2">Customer Details</h3>
                        <p className="text-sm text-gray-500">Name: {order.customerName}</p>
                        <p className="text-sm text-gray-500">Phone: {order.customerPhone}</p>
                        {order.customerEmail && <p className="text-sm text-gray-500">Email: {order.customerEmail}</p>}
                    </div>

                    {/* Shipping Info */}
                    <div>
                        <h3 className="font-semibold mb-2">Shipping Address</h3>
                        <p className="text-sm text-gray-500">{order.shippingAddress?.street}</p>
                        <p className="text-sm text-gray-500">
                            {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
                        </p>
                    </div>
                </div>

                <Separator className="my-4" />

                {/* Order Items */}
                <div>
                    <h3 className="font-semibold mb-2">Order Items</h3>
                    <div className="space-y-3">
                        {order.items?.map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center text-sm border-b pb-2 last:border-0">
                                <div className="flex items-center space-x-2">
                                    <span className="font-bold">{item.quantity}x</span>
                                    <span>{item.productName || 'Product'}</span>
                                </div>
                                <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center pt-4 font-bold text-lg">
                        <span>Total</span>
                        <span>Rs. {order.totalAmount?.toLocaleString()}</span>
                    </div>
                </div>

                <Separator className="my-4" />

                {/* Actions */}
                <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                    <span className="text-sm font-medium">Update Order Status:</span>
                    <div className="w-[200px]">
                        {updating ? (
                            <div className="flex items-center justify-center h-10">
                                <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
                            </div>
                        ) : (
                            <Select defaultValue={order.status} onValueChange={handleStatusChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Processing">Processing</SelectItem>
                                    <SelectItem value="Shipped">Shipped</SelectItem>
                                    <SelectItem value="Delivered">Delivered</SelectItem>
                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                </div>

                {order.note && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded text-sm text-yellow-800">
                        <strong>Note:</strong> {order.note}
                    </div>
                )}

            </DialogContent>
        </Dialog>
    );
}
