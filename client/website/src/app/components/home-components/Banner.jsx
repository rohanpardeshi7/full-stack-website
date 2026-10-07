"use client";
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css';


export default function Banner() {
  return (
    <div>
        <Swiper
        
    spaceBetween={0}
    slidesPerView={1}
    pagination={{ clickable: true }}
    modules={[Pagination,Autoplay]}
    loop={true}
    autoplay={{
        delay: 2000, // Time between transitions in ms
        disableOnInteraction: false, // Continue autoplay after user swiped
        pauseOnMouseEnter: true, // Pause autoplay when hovering over the slider
      }}
  >
    <SwiperSlide><img src="/slider-img1.jpg" alt="" /></SwiperSlide>
    <SwiperSlide><img src="/slider-img2.jpg" alt="" /></SwiperSlide>
    <SwiperSlide><img src="/slider-img3.jpg" alt="" /></SwiperSlide>
  </Swiper>
  </div>
  )
}
