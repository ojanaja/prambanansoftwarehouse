import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div className="md:px-[8%] py-[3%] text-center md:text-left bg-primary-400 text-white hidden md:block">
        <div className="hidden md:block">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1.5 w-full">
              <h1 className="uppercase font-bold text-xl">Contact</h1>
              <p>prambanandigital@gmail.com</p>
              <p>(+62)-851-8993-3901 (Min Pram)</p>
            </div>
            <div className="flex flex-col gap-1.5 w-full">
              <h1 className="uppercase font-bold text-xl">Follow</h1>
              <a href="https://www.instagram.com/prambanandigital/" target="_blank" className="flex gap-2 items-center">
                <FaInstagram className="text-2xl" />
                <p className="text-sm">prambanandigital</p>
              </a>
            </div>
            <div className="flex flex-col gap-1.5 w-3/4">
              <div className="flex gap-2 items-center">
                <h1 className="text-xl font-bold italic">Prambanan Digital</h1>
              </div>
              <p>Prambanan Digital adalah perusahaan pengembangan perangkat lunak yang berdedikasi untuk mewujudkan visi Anda dengan harga yang tepat.</p>
            </div>
          </div>
        </div>
        <p className="font-bold uppercase w-full md:border-t-2 md:mt-4 md:pt-2 border-white">Copyright © 2024 | All Right Reserved</p>
      </div>
      <div className="px-5 py-[5%] text-center bg-primary-400 text-white mt-auto md:hidden">
        <div className="flex justify-center items-center flex-col gap-3 w-full">
          <p className="text-2xl font-bold">Follow</p>
          <div className="flex gap-2">
            <a href="https://www.instagram.com/prambanandigital/" target="_blank" className="flex items-center gap-1 cursor-pointer">
              <FaInstagram />
              <p className="text-lg">prambanandigital</p>
            </a>
          </div>
        </div>
        <p className="pt-[5%] uppercase font-bold text-sm text-center">Copyright © 2024 | All Rights Reserved</p>
      </div>
    </>
  );
}
