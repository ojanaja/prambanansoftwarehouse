import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="md:px-[8%] py-[3%] text-center md:text-left bg-primary-400 text-white">
      <div className="hidden md:block">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1.5 w-full">
            <h1 className="uppercase font-bold text-xl">Contact</h1>
            <p>admin@prambanandigital.id</p>
            <p>(+62)-812-2177-9294 (Fauzan)</p>
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
              <h1 className="text-xl font-bold italic">Prambanan Software House</h1>
            </div>
            <p>Prambanan Software House is a software development company dedicated to bringing your vision to life with precision price. </p>
          </div>
        </div>
      </div>
      <p className="font-bold uppercase w-full md:border-t-2 md:mt-4 md:pt-2 border-white">Copyright © 2024 | All Right Reserved</p>
    </div>
  );
}
