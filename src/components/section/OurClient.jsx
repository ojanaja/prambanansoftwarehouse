"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

export default function OurClient() {
  const clients = [
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
      id: 6,
      name: "Maqdis",
      imageUrl: "/client/resizemaqdis.png",
    },
  ];
  return (
    <div className="py-[2%] mx-[10%]">
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
                width={500}
                height={500}
                priority
                title={client.name}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
