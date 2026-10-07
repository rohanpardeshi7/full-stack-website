"use client";
import React, { useState, useEffect } from "react"; // 1. Added useEffect
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { AiFillStar } from "react-icons/ai";

import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  // 2. State to check if component is mounted on client side
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const reviews = [
    {
      id: 1,
      text: "These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
      name: "KATHY YOUNG",
      designation: "CEO of SunPark",
    },
    {
      id: 2,
      text: "Excellent quality products and brilliant customer support. They helped me with every custom setting I needed. The delivery was fast, and the packaging was robust. Will definitely shop again!",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
      name: "ALEXA BLISS",
      designation: "Interior Designer",
    },
    {
      id: 3,
      text: "Highly professional service! The furniture designs are unique and very elegant. The team responded within minutes when I had questions about dimensions. Totally recommended for elite spaces.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      name: "SARAH CONNOR",
      designation: "Founder, DecorIO",
    },
  ];

  // 3. SSR Safety: Return a placeholder wrapper during server rendering
  if (!mounted) {
    return <section className="w-full py-16 bg-white min-h-[400px]"></section>;
  }

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-[850px] mx-auto px-6 text-center">
        
        <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-wide mb-6">
          What Our Custumers Say ?
        </h2>

        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".custom-swiper-pagination",
            renderBullet: function (index, className) {
              return `<span class="${className} inline-block w-2 h-2 rounded-full mx-1 cursor-pointer transition-all duration-300"></span>`;
            },
          }}
          loop={true}
          spaceBetween={40}
          slidesPerView={1}
          className="w-full"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className="pb-4">
              <div className="flex flex-col items-center space-y-6">
                <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl font-medium">
                  "{review.text}"
                </p>

                <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-serif font-bold tracking-widest text-gray-900 uppercase">
                    {review.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium">
                    {review.designation}
                  </p>
                </div>

                <div className="flex items-center justify-center space-x-1 text-[#c09578]">
                  {[...Array(5)].map((_, index) => (
                    <AiFillStar key={index} size={16} />
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="w-full flex justify-center items-center mt-8">
          <div className="custom-swiper-pagination flex items-center justify-center"></div>
        </div>

      </div>

      <style jsx global>{`
        .custom-swiper-pagination .swiper-pagination-bullet {
          background: #e5e7eb !important;
          opacity: 1 !important;
        }
        .custom-swiper-pagination .swiper-pagination-bullet-active {
          background: #c09578 !important;
        }
      `}</style>
    </section>
  );
}