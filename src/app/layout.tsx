import type { Metadata } from "next";
import { Figtree, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/authContext";
import { icons } from "lucide-react";

const font = Figtree({
  subsets: ["latin"],
});

export const metadata = {
  title: "Bookoria | Best Bookstore",
  description: "Buy books online in Kathmandu, Nepal",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${font.className} antialiased `}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
