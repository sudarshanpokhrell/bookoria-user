import type { Metadata } from "next";
import { Figtree, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/authContext";

const font = Figtree({
  subsets: ["latin"],
});

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
