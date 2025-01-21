
"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const [nepalTime, setNepalTime] = useState(getNepalTime());

  // Function to get Nepal time
  function getNepalTime() {
    const now = new Date();
    const nepalTime = now.toLocaleTimeString("en-US", {
      timeZone: "Asia/Kathmandu",
    });
    return nepalTime;
  }

  // Update Nepal time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setNepalTime(getNepalTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-[#000000] text-white px-5 pt-24 mt-20 pb-10 ">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Bookoria</h2>
          <p className="text-white-400 text-md">
            BOOKORIA offers a world of stories and insights. Discover our
            curated collection of fiction, non-fiction, and classics, and
            transform your reading journey. Explore a new adventure with every
            book.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-md text-white">
            <li>
              <Link href="/" className="hover:text-gray-400 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-gray-400 transition-colors"
              > 
                Feedback
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-gray-400 transition-colors"
              >
                Customer Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <ul className="space-y-2 text-md text-white">
            <li>Address: Kathmandu, Nepal</li>
            <li>Cell: +977 98674598</li>
            <li>Email: contact@bookoria.com</li>
            <li>Time: {nepalTime}</li>
          </ul>
          <div className="flex items-center space-x-4 mt-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        © 2024, BOOKORIA
      </div>
    </footer>
  );
};

export default Footer;
