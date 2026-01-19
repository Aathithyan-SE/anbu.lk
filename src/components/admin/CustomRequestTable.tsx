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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface CustomRequestTableProps {
    requests: any[];
}

export function CustomRequestTable({ requests }: CustomRequestTableProps) {

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                No requests found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        requests.map((req) => (
                            <TableRow key={req._id}>
                                <TableCell>{new Date(req.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{req.customerName}</span>
                                        <span className="text-xs text-gray-500">{req.customerPhone}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col text-sm">
                                        <span>{req.occasion}</span>
                                        <span className="text-xs text-gray-500">{req.recipientGender}</span>
                                    </div>
                                </TableCell>
                                <TableCell>Rs. {req.budgetRange}</TableCell>
                                <TableCell>
                                    <Badge variant={req.status === 'Completed' ? 'default' : 'secondary'}>
                                        {req.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <RequestDetailsDialog request={req} />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

function RequestDetailsDialog({ request }: { request: any }) {
    if (!request) return null;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Custom Combo Request</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="text-xs text-gray-500 uppercase">Customer</span>
                            <p>{request.customerName}</p>
                            <p className="text-sm">{request.customerPhone}</p>
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 uppercase">Budget</span>
                            <p>Rs. {request.budgetRange}</p>
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 uppercase">Occasion</span>
                            <p>{request.occasion}</p>
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 uppercase">Recipient</span>
                            <p>{request.recipientGender}</p>
                        </div>
                    </div>

                    <div>
                        <span className="text-xs text-gray-500 uppercase">Preferences</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {request.preferences?.map((p: string) => (
                                <Badge key={p} variant="outline">{p}</Badge>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <span className="text-xs text-gray-500 uppercase">Description / Instructions</span>
                        <p className="bg-gray-50 p-3 rounded text-sm mt-1">{request.description || 'No specific description provided.'}</p>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button asChild className="bg-green-600 hover:bg-green-700">
                            <a href={`https://wa.me/${request.customerPhone}`} target="_blank" rel="noopener noreferrer">
                                Chat on WhatsApp
                            </a>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
