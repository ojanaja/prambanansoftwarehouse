import { motion } from "framer-motion";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

export default function NavbarMobile({ isOpen, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{
        opacity: isOpen ? 1 : 0,
        x: isOpen ? 0 : "100%",
      }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[1000] md:hidden">
      <div className="bg-white w-full h-full px-[5%] py-5 text-black">
        <div className="flex justify-between items-center">
          <div className="w-16 logo px-3 cursor-pointer p-2">
            <Image src="/logo/prambanan_logo3.png" className="w-auto h-auto" alt="Logo Prambanan" width={100} height={100} priority />
          </div>
          <button onClick={onClose}>
            <RxCross2 className="text-4xl" />
          </button>
        </div>

        {/* Parent motion.div for the nav menu items */}
        <motion.nav
          className="flex flex-col gap-12 p-3 py-[23%]"
          initial="hidden"
          animate={isOpen ? "show" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}>
          {/* Each motion.ul is now animated individually */}
          <motion.ul
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}>
            <li className="text-4xl">
              <a href="/">Home</a>
            </li>
          </motion.ul>
          <motion.ul
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}>
            <li className="text-4xl">
              <a href="#services" onClick={() => onClose()}>
                Services
              </a>
            </li>
          </motion.ul>
          <motion.ul
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}>
            <li className="text-4xl">
              <a href="#about" onClick={() => onClose()}>
                About Us
              </a>
            </li>
          </motion.ul>
          {/* <motion.ul
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}>
            <li className="text-4xl">
              <a href="#contact" onClick={() => onClose()}>
                Contact
              </a>
            </li>
          </motion.ul> */}
          <motion.ul
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}>
            <li className="text-3xl border p-3 border-black w-fit rounded-lg">
              <a href="#contact" onClick={() => onClose()}>
                Request Demo
              </a>
            </li>
          </motion.ul>
        </motion.nav>

        {/* Bottom text */}
        <div className="fixed bottom-7 left-0 right-0 flex justify-center items-center">
          <div className="text-xl font-bold italic">Prambanan Digital</div>
        </div>
      </div>
    </motion.div>
  );
}
