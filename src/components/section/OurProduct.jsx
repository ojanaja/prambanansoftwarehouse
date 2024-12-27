"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css";

export default function OurProductSection() {
  const productWebsite = [
    {
      id: 1,
      name: "BPLJ PUPR",
      imageURL: "/product/bplj_pupr/lobby.png",
      imageURL2: "/product/bplj_pupr/login.png",
      imageURL3: "/product/bplj_pupr/schedule.png",
    },
    {
      id: 2,
      name: "EasyBook",
      imageURL: "/product/easybook/dashboard.png",
      imageURL2: "/product/easybook/dashboard_add_buku.png",
      imageURL3: "/product/easybook/dashboard_pembayaran.png",
    },
    {
      id: 3,
      name: "Edutrain",
      imageURL: "/product/edutrain/home.png",
      imageURL2: "/product/edutrain/webinar.png",
      imageURL3: "/product/edutrain/forum_diskusi.png",
    },
    {
      id: 4,
      name: "Pertamina",
      imageURL: "/product/pertamina/dashboard.png",
      imageURL2: "/product/pertamina/login.png",
      imageURL3: "/product/pertamina/stk_repository.png",
    },
  ];

  const productMobile = [
    {
      id: 1,
      name: "Binder",
      imageURL: "/product/binder/login.png",
      imageURL2: "/product/binder/home.png",
      imageURL3: "/product/binder/matches.png",
    },
    {
      id: 2,
      name: "Stylish",
      imageURL: "/product/stylish/splashscreen.png",
      imageURL2: "/product/stylish/onboarding.png",
      imageURL3: "/product/stylish/placeorder.png",
    },
    {
      id: 3,
      name: "OniFarm",
      imageURL: "/product/onifarm/login.png",
      imageURL2: "/product/onifarm/kesuburan.png",
      imageURL3: "/product/onifarm/pengaturan_jadwal_penyiraman.png",
    },
  ];

  const product = [
    // {
    //   id: 1,
    //   name: "BPLJ PUPR",
    //   imageURL: "/product/bplj_pupr/lobby.png",
    //   imageURL2: "/product/bplj_pupr/login.png",
    //   imageURL3: "/product/bplj_pupr/schedule.png",
    // },
    {
      id: 2,
      name: "Binder",
      imageURL: "/product/binder/login.png",
      imageURL2: "/product/binder/home.png",
      imageURL3: "/product/binder/matches.png",
    },
    {
      id: 3,
      name: "Ivolks Creative",
      imageURL: "/product/ivolks/services.png",
      imageURL2: "/product/ivolks/home.png",
      imageURL3: "/product/ivolks/about.png",
    },
    {
      id: 4,
      name: "EasyBook",
      imageURL: "/product/easybook/dashboard.png",
      imageURL2: "/product/easybook/dashboard_add_buku.png",
      imageURL3: "/product/easybook/dashboard_pembayaran.png",
    },
    {
      id: 5,
      name: "Stylish",
      imageURL: "/product/stylish/splashscreen.png",
      imageURL2: "/product/stylish/onboarding.png",
      imageURL3: "/product/stylish/placeorder.png",
    },
    // {
    //   id: 6,
    //   name: "Edutrain",
    //   imageURL: "/product/edutrain/home.png",
    //   imageURL2: "/product/edutrain/webinar.png",
    //   imageURL3: "/product/edutrain/forum_diskusi.png",
    // },
    {
      id: 7,
      name: "OniFarm",
      imageURL: "/product/onifarm/login.png",
      imageURL2: "/product/onifarm/kesuburan.png",
      imageURL3: "/product/onifarm/pengaturan_jadwal_penyiraman.png",
    },
    {
      id: 8,
      name: "Pertamina",
      imageURL: "/product/pertamina/dashboard.png",
      imageURL2: "/product/pertamina/login.png",
      imageURL3: "/product/pertamina/stk_repository.png",
    },
  ];

  return (
    <div className="px-[5%] md:px-[3%] pt-[7%]">
      <p className="text-right text-2xl text-primary-600 font-medium">
        Our Product
      </p>
      <div className="flex justify-center w-full pt-[3%]">
        <div className="w-full rounded-lg backdrop-blur-2xl">
          <div className="py-[1%] px-[5%]">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              slidesPerView={"auto"}
              centeredSlides={true}
              loop={true}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              initialSlide={1}
              // pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
            >
              {product.map((item) => (
                <SwiperSlide
                  key={item.id}
                  className="flex flex-col items-center"
                >
                  <div className="hidden md:block">
                    <div className="flex gap-2">
                      <div className="relative w-full h-[400px]">
                        <Image
                          src={item.imageURL}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="w-auto h-auto object-contain"
                          priority
                        />
                      </div>
                      <div className="relative w-full h-[400px]">
                        <Image
                          src={item.imageURL2}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="w-auto h-auto object-contain"
                          priority
                        />
                      </div>
                      <div className="relative w-full h-[400px]">
                        <Image
                          src={item.imageURL3}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="w-auto h-auto object-contain"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                  <div className="md:hidden">
                    {/* <div className="relative w-full h-[300px] md:h-[400px]">
                      <Image src={item.imageURL} alt={item.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="w-auto h-auto object-contain" priority />
                    </div> */}
                    <div className="flex gap-2">
                      <div className="relative w-full h-[300px]">
                        <Image
                          src={item.imageURL}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="w-auto h-auto object-contain"
                          priority
                        />
                      </div>
                      <div className="relative w-full h-[300px]">
                        <Image
                          src={item.imageURL2}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="w-auto h-auto object-contain"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                  <h1 className="md:text-3xl italic font-semibold text-center text-primary-900 mt-3">
                    {item.name}
                  </h1>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* <Swiper
              effect={"coverflow"}
              grabCursor={true}
              slidesPerView={"auto"}
              centeredSlides={true}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              // pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper">
              {productWebsite.map((item) => (
                <SwiperSlide key={item.id} className="flex flex-col items-center">
                  <div className="hidden md:block">
                    <div className="flex gap-2">
                      <div className="relative w-full h-[400px]">
                        <Image src={item.imageURL} alt={item.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="w-auto h-auto object-contain" priority />
                      </div>
                      <div className="relative w-full h-[400px]">
                        <Image src={item.imageURL2} alt={item.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="w-auto h-auto object-contain" priority />
                      </div>
                      <div className="relative w-full h-[400px]">
                        <Image src={item.imageURL3} alt={item.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="w-auto h-auto object-contain" priority />
                      </div>
                    </div>
                  </div>
                  <div className="md:hidden">
                    <div className="flex gap-2">
                      <div className="relative w-full h-[400px]">
                        <Image src={item.imageURL} alt={item.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="w-auto h-auto object-contain" priority />
                      </div>
                      <div className="relative w-full h-[400px]">
                        <Image src={item.imageURL2} alt={item.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="w-auto h-auto object-contain" priority />
                      </div>
                    </div>
                  </div>
                  <h1 className="md:text-3xl italic font-semibold text-center text-primary-900 mt-3">{item.name}</h1>
                </SwiperSlide>
              ))}
            </Swiper> */}
            <div className="py-[5%] md:hidden"></div>
            {/* <Swiper
              effect={"coverflow"}
              grabCursor={true}
              slidesPerView={"auto"}
              centeredSlides={true}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              // pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper">
              {productMobile.map((item) => (
                <SwiperSlide key={item.id} className="flex flex-col items-center">
                  <div className="hidden md:block">
                    <div className="flex gap-2">
                      <div className="relative w-full h-[400px]">
                        <Image src={item.imageURL} alt={item.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="w-auto h-auto object-contain" priority />
                      </div>
                      <div className="relative w-full h-[400px]">
                        <Image src={item.imageURL2} alt={item.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="w-auto h-auto object-contain" priority />
                      </div>
                      <div className="relative w-full h-[400px]">
                        <Image src={item.imageURL3} alt={item.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="w-auto h-auto object-contain" priority />
                      </div>
                    </div>
                  </div>
                  <div className="md:hidden">
                    <div className="flex gap-2">
                      <div className="relative w-full h-[400px]">
                        <Image src={item.imageURL} alt={item.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="w-auto h-auto object-contain" priority />
                      </div>
                      <div className="relative w-full h-[400px]">
                        <Image src={item.imageURL2} alt={item.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="w-auto h-auto object-contain" priority />
                      </div>
                    </div>
                  </div>
                  <h1 className="md:text-3xl italic font-semibold text-center text-primary-900 mt-3">{item.name}</h1>
                </SwiperSlide>
              ))}
            </Swiper> */}
          </div>
        </div>
      </div>
    </div>
  );
}
