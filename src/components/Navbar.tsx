"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ShoppingCart, User, Menu, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";
import { Button } from "./ui/button";

interface DropdownItem {
  href: string;
  label: string;
}

interface DropdownProps {
  trigger: string;
  items: DropdownItem[];
}

const DropdownMenu = ({ trigger, items }: DropdownProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="  text-md font-medium">
            {trigger}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white">
            <div className="w-48 rounded-md shadow-lg">
              <ul className="py-1">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const Navbar = () => {
  const pathname = usePathname();

  const fictionItems = [
    { href: "/books/fiction/fantasy", label: "Fantasy" },
    { href: "/books/fiction/romance", label: "Romance" },
  ];

  const nonFictionItems = [
    { href: "/books/non-fiction/biography", label: "Biography" },
    { href: "/books/non-fiction/science", label: "Science" },
    { href: "/books/non-fiction/history", label: "History" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white px-5 ">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16  ">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-8 w-8" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px] bg-white"
              >
                <MobileNav />
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center">
              <span className="text-2xl lg:text-3xl font-bold">Bookoria</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8 px-5">
            <Link
              href="/books"
              className={cn(
                "text-md font-medium transition-colors hover:text-primary",
                pathname === "/books" ? "text-primary" : "text-muted-foreground"
              )}
            >
              All Books
            </Link>
            <Link
              href="/books/new-arrivals"
              className={cn(
                "text-md font-medium transition-colors hover:text-primary",
                pathname === "/books/new-arrivals"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              New Arrivals
            </Link>
            <Link
              href="/books/popular"
              className={cn(
                "text-md font-medium transition-colors hover:text-primary",
                pathname === "/books/popular"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              Popular
            </Link>

            <DropdownMenu trigger="Fiction" items={fictionItems} />
            <DropdownMenu trigger="Non-fiction" items={nonFictionItems} />
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Link href={"/search"}>
                <Search className=" " />
                <span className="sr-only">Search</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Link href={"/cart"}>
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Link href={"/profile"}>
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
