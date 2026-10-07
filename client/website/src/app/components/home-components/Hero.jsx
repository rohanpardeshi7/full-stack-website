    "use client";
import React from "react";

export default function Hero() {
  const collections = [
    {
      id: 1,
      subtitle: "Design Creative",
      title: "Chair Collection",
      image: "/chair1.webp",
    },
    {
      id: 2,
      subtitle: "Bestselling Products",
      title: "Chair Collection",
      image: "/chair3.webp",
    },
    {
      id: 3,
      subtitle: "Onsale Products",
      title: "Chair Collection",
      image: "/chair2.webp",
    },
  ];

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((item) => (
            <div
              key={item.id}
              className="w-full h-[250px] md:h-[280px] relative overflow-hidden rounded-sm group cursor-pointer shadow-sm"
            >
              {/* Background Image with Zoom Effect */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${item.image}')` }}
              ></div>

              {/* Light overlay to maintain text readability */}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300"></div>

              {/* Text Content Layer */}
              <div className="absolute inset-0 flex flex-col justify-start p-8 pt-10 z-10">
                <span className="text-xs md:text-sm font-medium text-gray-800 tracking-wide">
                  {item.subtitle}
                </span>
                <h2 className="text-xl md:text-2xl font-serif font-bold text-[#2d2a26] mt-1 tracking-tight">
                  {item.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}