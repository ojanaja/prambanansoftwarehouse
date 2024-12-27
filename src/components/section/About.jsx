import Image from "next/image";
import { HiOutlineMail } from "react-icons/hi";
import { HiPhone } from "react-icons/hi";

export default function AboutSection() {
  return (
    <div className=" bg-primary-400" id="about">
      <div className="px-[5%] md:px-[3%] lg:px-[8%] py-[15%] md:py-[5%]">
        <div className="grid md:grid-cols-2 gap-6 md:gap-[6%]">
          {/* Teks */}
          <div className="order-2 md:order-1">
            <h1 className="font-bold uppercase text-primary-950 text-3xl italic">
              About Us
            </h1>
            <p className="text-white pt-2">
              Prambanan Digital adalah perusahaan pengembangan software yang
              berdedikasi untuk mewujudkan visi Anda dengan harga yang tepat.
              Kami menawarkan model pay-as-you-go, yang memungkinkan Anda untuk
              berinvestasi hanya pada fitur yang Anda butuhkan, menghemat waktu
              dan sumber daya dengan menghindari pengembangan yang tidak perlu.
            </p>
            <div className="pt-3 text-white flex flex-col gap-2">
              <div className="flex gap-3 items-center">
                <HiOutlineMail className="text-3xl" />
                <p>prambanandigital@gmail.com</p>
              </div>
              <div className="flex gap-3 items-center">
                <HiPhone className="text-3xl" />
                <p>(+62)-851-8993-3901 (Min Pram)</p>
              </div>
            </div>
          </div>

          {/* Gambar */}
          <div className="order-1 md:order-2 flex justify-center">
            <Image
              src={"/about/about.webp"}
              alt="About Us"
              className="rounded-3xl object-cover w-auto h-[90%]"
              width={1000}
              height={500}
              quality={50}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
