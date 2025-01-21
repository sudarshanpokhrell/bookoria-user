import BookCarousel from "@/components/Carousel";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <h1 className="px-5 py-3 text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight  ">
        Popular
      </h1>
      <BookCarousel />
      {/**Poster */}
      <h1 className="px-5 py-3 text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight  ">
        New Arrivals
      </h1>
      <BookCarousel />
    </div>
  );
}
