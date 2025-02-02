import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/provider/ReduxProvider";
import CartProvider from "@/provider/CartProvider";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Commerce",
  description: "A Multi-Functional Online Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#30383d]`}>
        <ReduxProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
