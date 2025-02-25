import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="container flex justify-between px-10 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Your Gateway to Literary Adventures!
          </h1>
          <p className="text-lg md:text-xl text-gray-900 max-w-lg">
            Discover a world of stories, knowledge, and imagination. Find your
            next favorite book with us.
          </p>
          <div>
            <Button
              type="button"
              className="inline-flex items-center px-10 py-6 text-xl font-medium text-gray-900 bg-white border-2 border-gray-900 rounded-full hover:bg-[#463F3A] hover:text-white hover:border-[#463F3A] transition-colors"
            >
              <Link href="/books">Shop Now</Link>
            </Button>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Left Column Images */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden ">
              <Image
                src="/images/seven.jpg"
                alt="Stack of business and startup books"
                width={500}
                height={375}
                className="w-full h-full object-cover  "
              />
            </div>
            <div className="aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/images/one.jpg"
                alt="Book titled Milk and Honey"
                width={500}
                height={375}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Right Column Images */}
          <div className="space-y-4 mt-8">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/three.jpeg"
                alt="Stack of modern books"
                width={500}
                height={375}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/images/five.jpeg"
                alt="Open book with annotations"
                width={500}
                height={375}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
