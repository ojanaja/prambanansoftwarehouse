"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar2() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // Posisi scroll
      const windowHeight = window.innerHeight; // Tinggi viewport

      // Mengecek apakah scroll sudah mencapai 1 kali panjang halaman (viewport)
      if (scrollPosition > windowHeight) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Mengetahui posisi section dan menandai yang aktif
      const sections = ["services", "about", "contact"];
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          if (
            scrollPosition >= top - windowHeight / 2 &&
            scrollPosition < bottom - windowHeight / 2
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className="absolute z-20 bg-white w-full">
        <div className="flex justify-between items-center gap-3 px-[9%]">
          <Link href={"/"} className="flex gap-2 items-center">
            <div className="w-16 logo px-3 p-2 select-none">
              <Image
                src="/logo/logo.png"
                className="w-auto h-auto shadow-lg"
                alt="Logo Prambanan"
                width={100}
                height={100}
                priority
              />
            </div>
            <p className="font-bold text-xl uppercase">Prambanan</p>
          </Link>
          <ul className="flex gap-2 items-center">
            <li>
              <Link
                href="#services"
                className="px-3 py-3 text-lg font-semibold text-gray-600 hover:text-black"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                className="px-3 py-3 text-lg font-semibold text-gray-600 hover:text-black"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="px-3 py-3 text-lg font-semibold text-gray-600 hover:text-black"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className={`fixed z-[100] w-full left-0 top-[3%] transform -translate-y-1/2 transition-all duration-500 ${
          scrolled ? "translate-y-0" : "opacity-0 translate-y-0"
        }`}
      >
        <div className="flex items-center justify-center">
          <ul className="flex space-x-4 border border-black rounded-full py-1">
            <li>
              <Link
                href="#services"
                className={`py-1 px-1 ${
                  activeSection === "services"
                    ? "text-blue-500  rounded-full border-2 border-blue-500"
                    : "text-black"
                }`}
              >
                For Services
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                className={`py-1 px-1 ${
                  activeSection === "about"
                    ? "text-blue-500 rounded-full border-2 border-blue-500"
                    : "text-black"
                }`}
              >
                For About
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className={`py-1 px-1 ${
                  activeSection === "contact"
                    ? "text-blue-500 rounded-full border-2 border-blue-500"
                    : "text-black"
                }`}
              >
                For Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* <div className="flex items-center justify-center rounded-full">
          <ul className="flex gap-5 py-2 border-black border rounded-full">
            <li>
              <Link href="#services" className={`py-2 ${activeSection === "services" ? "text-blue-500  rounded-full border-2 border-blue-500" : "text-black"}`}>
                For Services
              </Link>
            </li>
            <li>
              <Link href="#about" className={`py-2 ${activeSection === "about" ? "text-blue-500 rounded-full border-2 border-blue-500" : "text-black"}`}>
                For About Us
              </Link>
            </li>
            <li>
              <Link href="#contact" className={`py-2 ${activeSection === "contact" ? "text-blue-500 rounded-full border-2 border-blue-500" : "text-black"}`}>
                For Contact
              </Link>
            </li>
          </ul>
        </div> */}
      </div>
    </>
  );
}
