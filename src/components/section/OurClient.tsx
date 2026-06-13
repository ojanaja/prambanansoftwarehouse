"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ClientItem {
  id: number;
  name: string;
  imageUrl: string;
}

export default function OurClient() {
  const clients: ClientItem[] = [
    {
      id: 1,
      name: "Ivolks Creative",
      imageUrl: "/client/ivolks.png",
    },
    {
      id: 2,
      name: "Pertamina",
      imageUrl: "/client/resizepertamina.png",
    },
    {
      id: 3,
      name: "BPLJ",
      imageUrl: "/client/bplj.png",
    },
    {
      id: 4,
      name: "UIN Sunan Gunung Djati",
      imageUrl: "/client/uin.png",
    },
    {
      id: 5,
      name: "PTIPD",
      imageUrl: "/client/ptipd.png",
    },
    {
      id: 6,
      name: "Hamim",
      imageUrl: "/client/hamim.png",
    },
    {
      id: 7,
      name: "Maqdis",
      imageUrl: "/client/resizemaqdis.png",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%",
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  return (
    <div className="py-[2%] mx-[10%]" ref={containerRef}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={7}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          stopOnLastSlide: false,
        }}
        speed={3000}
        loop={true}
        breakpoints={{
          0: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
        }}
        className="clients-slider"
      >
        {clients.map((client, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <div className="relative w-28 h-28">
              <Image
                src={client.imageUrl}
                alt={client.name}
                className="grayscale hover:grayscale-0 cursor-pointer object-contain w-full h-full"
                width={112}
                height={112}
                title={client.name}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
