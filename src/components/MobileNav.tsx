"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  href: string;
  items?: {
    title: string;
    href: string;
    description?: string;
  }[];
}

const menuItems: MenuItem[] = [
  {
    title: "All Books",
    href: "/books",
  },
  {
    title: "New Arrivals",
    href: "/books/new-arrivals",
  },
  {
    title: "Popular",
    href: "/books/popular",
  },
  {
    title: "Fiction",
    href: "/books/fiction",
    items: [
      {
        title: "Mystery",
        href: "/books/fiction/mystery",
      },
      {
        title: "Science Fiction",
        href: "/books/fiction/sci-fi",
      },
    ],
  },
  {
    title: "Non-Fiction",
    href: "/books/non-fiction",
    items: [
      {
        title: "Biography",
        href: "/books/non-fiction/biography",
      },
      {
        title: "History",
        href: "/books/non-fiction/history",
      },
    ],
  },
];

export function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ScrollArea className=" my-6 h-[calc(100vh-8rem)] pb-10">
      <div className="flex flex-col space-y-4 px-4">
        {menuItems.map((item) =>
          item.items ? (
            <Accordion
              key={item.href}
              type="single"
              collapsible
              className="w-full"
            >
              <AccordionItem value={item.title} className="border-none">
                <AccordionTrigger className="py-2 text-base font-medium hover:no-underline">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-3 pl-4 pt-2">
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-sm text-muted-foreground transition-colors hover:text-primary",
                        pathname === item.href && "text-primary font-medium"
                      )}
                    >
                      All {item.title}
                    </Link>
                    {item.items.map((subItem) => (
                      <div key={subItem.href} className="space-y-1">
                        <Link
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "block text-sm text-muted-foreground transition-colors hover:text-primary",
                            pathname === subItem.href &&
                              "text-primary font-medium"
                          )}
                        >
                          {subItem.title}
                        </Link>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "py-2 text-base font-medium text-muted-foreground transition-colors hover:text-primary",
                pathname === item.href && "text-primary"
              )}
            >
              {item.title}
            </Link>
          )
        )}
      </div>
    </ScrollArea>
  );
}
