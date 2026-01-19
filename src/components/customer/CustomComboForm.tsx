'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export function CustomComboForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        budgetRange: '',
        occasion: '',
        recipientGender: '',
        description: '',
        preferences: [] as string[]
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (checked: boolean, value: string) => {
        if (checked) {
            setFormData(prev => ({ ...prev, preferences: [...prev.preferences, value] }));
        } else {
            setFormData(prev => ({ ...prev, preferences: prev.preferences.filter(p => p !== value) }));
        }
    };

    const preferenceOptions = [
        'Chocolates', 'Flowers', 'Jewelry', 'Watches', 'Perfumes',
        'Greeting Cards', 'Soft Toys', 'Customized Mugs/Frames', 'Gadgets'
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/custom-combos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error('Failed to submit');

            setSuccess(true);
            window.scrollTo(0, 0);
        } catch (error) {
            console.error(error);
            alert('Failed to submit request. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎉</span>
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-2">Request Received!</h2>
                <p className="text-green-700 mb-6">
                    Thank you for trusting Anbu.lk with your special surprise. Our curation team will review your request and get back to you via WhatsApp shortly.
                </p>
                <Button
                    variant="outline"
                    onClick={() => {
                        setSuccess(false); setFormData({
                            customerName: '', customerPhone: '', customerEmail: '',
                            budgetRange: '', occasion: '', recipientGender: '', description: '', preferences: []
                        })
                    }}
                >
                    Submit Another Request
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 md:p-8 rounded-xl shadow-sm border">

            {/* Contact Info */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Your Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="customerName">Name *</Label>
                        <Input id="customerName" name="customerName" required value={formData.customerName} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="customerPhone">WhatsApp Number *</Label>
                        <Input id="customerPhone" name="customerPhone" required type="tel" value={formData.customerPhone} onChange={handleChange} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="customerEmail">Email (Optional)</Label>
                        <Input id="customerEmail" name="customerEmail" type="email" value={formData.customerEmail} onChange={handleChange} />
                    </div>
                </div>
            </div>

            {/* Preferences */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Gift Preferences</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Budget Range *</Label>
                        <Select onValueChange={(val) => handleSelectChange('budgetRange', val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select budget" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2500-5000">Rs. 2,500 - 5,000</SelectItem>
                                <SelectItem value="5000-10000">Rs. 5,000 - 10,000</SelectItem>
                                <SelectItem value="10000-20000">Rs. 10,000 - 20,000</SelectItem>
                                <SelectItem value="20000+">Rs. 20,000+</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Occasion *</Label>
                        <Select onValueChange={(val) => handleSelectChange('occasion', val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select occasion" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Birthday">Birthday</SelectItem>
                                <SelectItem value="Anniversary">Anniversary</SelectItem>
                                <SelectItem value="Valentines">Valentine's Day</SelectItem>
                                <SelectItem value="Congratulations">Congratulations</SelectItem>
                                <SelectItem value="Get Well Soon">Get Well Soon</SelectItem>
                                <SelectItem value="Sorry">Apology / Sorry</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label>Recipient Gender / Relationship</Label>
                        <Select onValueChange={(val) => handleSelectChange('recipientGender', val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select intent" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Male (Friend/Brother)">Male (Friend/Brother)</SelectItem>
                                <SelectItem value="Male (Partner/Husb)">Male (Partner/Husband)</SelectItem>
                                <SelectItem value="Female (Friend/Sister)">Female (Friend/Sister)</SelectItem>
                                <SelectItem value="Female (Partner/Wife)">Female (Partner/Wife)</SelectItem>
                                <SelectItem value="Parents">Parents</SelectItem>
                                <SelectItem value="Kids">Kids</SelectItem>
                                <SelectItem value="Corporate">Corporate</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-3 pt-2">
                    <Label>What items would you like included? (Select all that apply)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {preferenceOptions.map((opt) => (
                            <div key={opt} className="flex items-center space-x-2">
                                <Checkbox id={opt} onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, opt)} />
                                <label htmlFor={opt} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                    {opt}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Any specific instructions or ideas?</Label>
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="e.g., He loves dark chocolate and the color blue. Please include a handwritten note."
                        className="h-32"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <Button type="submit" className="w-full bg-[#D4A574] hover:bg-[#c29668] h-12 text-lg" disabled={loading}>
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : 'Send Request'}
            </Button>

        </form>
    );
}
