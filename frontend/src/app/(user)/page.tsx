"use client";

import Image from "next/image";
import SearchBar from "./_components/SearchBar";
import PlaceSection from "./_components/PlaceSection";
import MostPicked from "./_components/MostPicked";
export default function HomePage() {
  const information = [
    { label: "Bed", total: 3500 },
    { label: "Hotels", total: 200 },
    { label: "Cities", total: 5 },
  ];

  return (
    <>
      <section className="mt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-8 py-16">
          {/* Left side */}
          <div className="flex flex-col max-w-xl space-y-6 ml-5">
            <h1 className="font-bold text-5xl leading-tight text-gray-900">
              Forget busy work, <br />
              <span className="text-blue-600">start your next vacation</span>
            </h1>

            <p className="text-gray-600 text-lg">
              We provide everything you need to enjoy your trip — from cozy
              hotels to relaxing destinations.
            </p>

            <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg w-fit shadow hover:bg-blue-700 transition">
              Show Me Now
            </button>

            {/* Info section */}
            <div className="flex flex-row justify-between md:justify-start md:gap-16 mt-10">
              {information.map((info) => (
                <div
                  key={info.label}
                  className="flex flex-col items-center text-center min-w-[80px]"
                >
                  <span className="text-3xl font-bold text-gray-900 leading-none">
                    {info.total.toLocaleString()}+
                  </span>
                  <span className="text-gray-500 text-sm mt-1 tracking-wide uppercase">
                    {info.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side image */}
          <div className="mt-10 md:mt-0 mr-5 relative w-full md:w-[480px] h-[320px] rounded-2xl overflow-hidden shadow-lg">
            <Image src="/hero.jpg" alt="Hotel Logo" fill priority />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </div>
      </section>
      {/* Search */}
      <SearchBar />

      {/* Thu hút section */}
      <PlaceSection />
      {/* Most Picked Section */}
      <MostPicked />
    </>
  );
}
