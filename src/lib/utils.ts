import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateWhatsAppLink(order: any) {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94771234567';

  let message = `*New Order Placed!* 🎁\n`;
  message += `Order ID: ${order._id}\n`;
  message += `Name: ${order.customerName}\n`;
  message += `Total: Rs. ${order.totalAmount.toLocaleString()}\n\n`;

  message += `*Items:*\n`;
  order.items.forEach((item: any) => {
    message += `- ${item.quantity}x ${item.productName || 'Item'}\n`;
  });

  if (order.note) {
    message += `\n*Note:* ${order.note}`;
  }

  message += `\n\nPlease confirm my order.`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
