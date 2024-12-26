import { useState, useEffect } from "react";
import Image from "next/image";
import { HiMenu } from "react-icons/hi";
import NavbarMobile from "./NavbarMobile";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 9) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="hidden md:block">
        <div className="fixed w-full z-20 flex justify-center">
          <div className="container flex flex-row justify-center py-4 backdrop:blur-lg">
            <nav className={`flex items-center gap-1 px-3 py-1 border rounded-full  ${scrolled ? "bg-white shadow-lg" : "text-white bg-transparent border-transparent"}`}>
              <a href="/" className="w-16 logo p-2 pl-4 select-none">
                <Image src="/logo/prambanan_logo3.png" className="w-auto h-auto" alt="Logo Prambanan" width={100} height={100} priority />
              </a>
              <ul className="flex flex-row items-center gap-2 p-2">
                <li>
                  <a href="/" className="px-3 backdrop:blur-md hover:backdrop:blur-lg py-3 hover:transparent  hover:bg-slate-100 ease-in-out rounded-full transition-all cursor-pointer">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#services" className="px-3 backdrop:blur-md py-3 hover:transparent  hover:bg-slate-100 ease-in-out rounded-full transition-all cursor-pointer">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#about" className="px-3 backdrop:blur-md py-3 hover:transparent  hover:bg-slate-100 ease-in-out rounded-full transition-all cursor-pointer">
                    About Us
                  </a>
                </li>
                {/* <li>
                  <a href="#contact" className="px-3 backdrop:blur-md py-3 hover:transparent  hover:bg-slate-100 ease-in-out rounded-full transition-all cursor-pointer">
                    Contact
                  </a>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <nav className={`fixed top-0 w-full z-20  ${scrolled ? "bg-white shadow-lg" : "text-white bg-transparent border-transparent"}`}>
          <div className="px-[5%] py-5">
            <div className="flex justify-between items-center">
              <div className="w-16 logo px-3 cursor-pointer p-2">
                <Image src="/logo/prambanan_logo3.png" className="w-auto h-auto" alt="Logo Prambanan" width={100} height={100} priority />
              </div>
              <div onClick={() => setIsNavbarOpen(true)}>
                <HiMenu className="text-3xl cursor-pointer" />
              </div>
            </div>
          </div>
        </nav>
      </div>
      <NavbarMobile isOpen={isNavbarOpen} onClose={() => setIsNavbarOpen(false)} />
    </>
  );
}
