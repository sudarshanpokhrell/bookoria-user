import { Figtree } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/authContext";
import ErrorBoundary from "@/components/ErrorBoundary";

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
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
