import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="block mb-6">
                            <Image
                                src="/logo.png"
                                alt="Anbu.lk Logo"
                                width={180}
                                height={60}
                                className="h-10 md:h-12 w-auto object-contain brightness-0 invert"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm">
                            Sri Lanka's premier destination for curated gift combos and custom surprises.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-[#D4A574]">Home</Link></li>
                            <li><Link href="/products" className="hover:text-[#D4A574]">Shop Combos</Link></li>
                            <li><Link href="/track-order" className="hover:text-[#D4A574]">Track Order</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Contact Us</h4>
                        <div className="space-y-3 text-sm text-gray-400">
                            <div className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-[#D4A574] mt-0.5" />
                                <span>Chavakachcheri, Sri Lanka</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-[#D4A574]" />
                                <span>+94 78 201 2415</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-[#D4A574]" />
                                <span>hello@anbu.lk</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-[#D4A574]">
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-[#D4A574]">
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-[#D4A574]">
                                <Linkedin className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-[#D4A574]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-6 w-6"
                                >
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Anbu.lk. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
