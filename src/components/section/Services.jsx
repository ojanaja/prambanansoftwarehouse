// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function ServicesSection() {
//   return (
//     <div className="px-[5%] md:px-[3%] lg:px-[8%] min-h-screen py-[6%]" id="services">
//       <h1 className="text-xl text-center font-medium uppercase tracking-widest text-primary-600">Our Services</h1>
//       <p className="py-[2%] mb-5 font-semibold text-center text-xl md:text-3xl">
//         The One-Stop Solution to <br /> Empower Business Towards Success
//       </p>

//       <div className="flex flex-col gap-14 pt-[2%]">
//         {/* Section 1 */}
//         <motion.div
//           className="flex flex-col md:flex-row justify-center gap-5 md:gap-[6%] items-center"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: false, amount: 0.5 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}>
//           <Image src={"/services/custom_software_development1.png"} alt="Services 1" className="md:w-2/5 h-auto" width={1000} height={1000} priority />
//           <div className="flex flex-col gap-10">
//             <h1 className="text-3xl md:text-2xl lg:text-4xl font-bold">Custom Software Development</h1>
//             <p>Tailored software solutions designed to fit your unique business requirements, ensuring maximum functionality and efficiency.</p>
//             {/* <button>Learn More</button> */}
//           </div>
//         </motion.div>

//         {/* Section 2 */}
//         <motion.div
//           className="flex flex-col md:flex-row justify-center gap-5 md:gap-[6%] items-center"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: false, amount: 0.5 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}>
//           <div className="flex flex-col gap-10 order-2 md:order-1">
//             <h1 className="text-3xl md:text-2xl lg:text-4xl font-bold">Optimize Your Software</h1>
//             <p>Enhance performance, security, and user experience by improving your existing software to meet modern standards and business needs.</p>
//           </div>
//           <Image src={"/services/optimize_your_software1.png"} alt="Services 2" className="md:w-2/5 order-1 md:order-2" width={1000} height={1000} priority />
//         </motion.div>

//         {/* Section 3 */}
//         <motion.div
//           className="flex flex-col md:flex-row justify-center gap-5 md:gap-[6%] items-center"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: false, amount: 0.5 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}>
//           <Image src={"/services/developer_as_a_services1.png"} alt="Services 3" className="md:w-2/5" width={1000} height={1000} priority />
//           <div className="flex flex-col gap-10">
//             <h1 className="text-3xl md:text-2xl lg:text-4xl font-bold">Developer as a Service</h1>
//             <p>Flexible access to skilled developers who integrate seamlessly with your team, helping you scale your projects efficiently without long-term commitments.</p>
//             {/* <button>Learn More</button> */}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function ServicesSection() {
//   return (
//     <div className="px-[5%] md:px-[3%] lg:px-[8%] min-h-screen py-[6%]" id="services">
//       <h1 className="text-xl text-center font-medium uppercase tracking-widest text-primary-600">Our Services</h1>
//       <p className="py-[2%] mb-5 font-semibold text-center text-xl md:text-3xl">
//         The One-Stop Solution to <br /> Empower Business Towards Success
//       </p>

//       <div className="flex flex-col gap-14 pt-[2%]">
//         {/* Section 1 */}
//         <motion.div
//           className="flex flex-col md:flex-row justify-center gap-5 md:gap-[6%] items-center"
//           initial={{ opacity: 0, y: 50, scale: 0.95 }}
//           whileInView={{ opacity: 1, y: 0, scale: 1 }}
//           viewport={{ once: false, amount: 0.5 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}>
//           <Image src={"/services/custom_software_development1.png"} alt="Services 1" className="md:w-2/5 h-auto" width={1000} height={1000} priority />
//           <div className="flex flex-col gap-10">
//             <h1 className="text-3xl md:text-2xl lg:text-4xl font-bold">Custom Software Development</h1>
//             <p>Tailored software solutions designed to fit your unique business requirements, ensuring maximum functionality and efficiency.</p>
//           </div>
//         </motion.div>

//         {/* Section 2 */}
//         <motion.div
//           className="flex flex-col md:flex-row justify-center gap-5 md:gap-[6%] items-center"
//           initial={{ opacity: 0, y: 50, scale: 0.95 }}
//           whileInView={{ opacity: 1, y: 0, scale: 1 }}
//           viewport={{ once: false, amount: 0.5 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}>
//           <div className="flex flex-col gap-10 order-2 md:order-1">
//             <h1 className="text-3xl md:text-2xl lg:text-4xl font-bold">Optimize Your Software</h1>
//             <p>Enhance performance, security, and user experience by improving your existing software to meet modern standards and business needs.</p>
//           </div>
//           <Image src={"/services/optimize_your_software1.png"} alt="Services 2" className="md:w-2/5 order-1 md:order-2" width={1000} height={1000} priority />
//         </motion.div>

//         {/* Section 3 */}
//         <motion.div
//           className="flex flex-col md:flex-row justify-center gap-5 md:gap-[6%] items-center"
//           initial={{ opacity: 0, y: 50, scale: 0.95 }}
//           whileInView={{ opacity: 1, y: 0, scale: 1 }}
//           viewport={{ once: false, amount: 0.5 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}>
//           <Image src={"/services/developer_as_a_services1.png"} alt="Services 3" className="md:w-2/5" width={1000} height={1000} priority />
//           <div className="flex flex-col gap-10">
//             <h1 className="text-3xl md:text-2xl lg:text-4xl font-bold">Developer as a Service</h1>
//             <p>Flexible access to skilled developers who integrate seamlessly with your team, helping you scale your projects efficiently without long-term commitments.</p>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import CustomSoftware from "../lottie/Custom Software development.json";
import OptimizeSoftware from "../lottie/Optimize Software.json";
import AdsIntegration from "../lottie/Social Media Integration.json";

export default function ServicesSection() {
  return (
    <div className="px-[5%] md:px-[3%] lg:px-[8%] min-h-screen py-[6%] md:pt-[6%] md:py-0" id="services">
      <h1 className="text-xl text-center font-medium uppercase tracking-widest text-primary-600">Our Services</h1>
      <p className="py-[2%] mb-5 font-semibold text-center text-xl md:text-3xl">
        The One-Stop Solution to <br /> Empower Business Towards Success
      </p>

      <div className="flex flex-col gap-[-10%] pt-[2%]">
        {/* Section 1 */}
        <motion.div
          className="flex flex-col tablet-landscape:flex-col lg:flex-row justify-center gap-5 md:gap-[6%] items-center"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}>
          {/* <Image src={"/services/custom_software_development1.png"} alt="Services 1" className="md:w-2/5 h-auto" width={1000} height={1000} priority /> */}
          <div className="md:w-[90%] lg:w-[90%]">
            <Lottie animationData={CustomSoftware} />
          </div>
          <div className="flex flex-col gap-5 md:px-[10%] tablet-landscape:px-[11%] lg:px-0">
            <h1 className="text-3xl md:text-2xl lg:text-4xl font-bold">Custom Software Development</h1>
            <p>Tailored software solutions designed to fit your unique business requirements, ensuring maximum functionality and efficiency.</p>
          </div>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          className="flex flex-col tablet-landscape:flex-col lg:flex-row justify-center md:-mt-16 tablet-landscape:-mt-10 lg:-mt-28 md:gap-[6%] items-center"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="-mt-10 md:-mt-24 lg:mt-0 flex flex-col gap-5 order-2 md:order-1 tablet-landscape:order-2 tablet-landscape:-mt-20 tablet-landscape:px-[11%] md:px-[10%] lg:px-0">
            <h1 className="text-3xl md:text-2xl lg:text-4xl font-bold">Optimize Your Software</h1>
            <p>Enhance performance, security, and user experience by improving your existing software to meet modern standards and business needs.</p>
          </div>
          <div className="md:w-[90%] lg:w-[70%] tablet-landscape:order-1 lg:order-2">
            <Lottie animationData={OptimizeSoftware} />
          </div>
          {/* <Image src={"/services/optimize_your_software1.png"} alt="Services 2" className="md:w-2/5 order-1 md:order-2" width={1000} height={1000} priority /> */}
        </motion.div>

        {/* Section 3 */}
        <motion.div
          className="flex flex-col tablet-landscape:flex-col lg:flex-row justify-center mt-12 lg:-mt-20 tablet-landscape:mt-20 gap-10 md:gap-[6%] items-center"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}>
          {/* <Image src={"/services/developer_as_a_services1.png"} alt="Services 3" className="md:w-2/5" width={1000} height={1000} priority /> */}
          <div className="md:w-[70%] lg:w-[50%]">
            <Lottie animationData={AdsIntegration} />
          </div>
          <div className="flex flex-col gap-5 md:px-[10%] lg:px-0 md:mt-14 tablet-landscape:mt-14 tablet-landscape:px-[11%] lg:mt-0">
            <h1 className="text-3xl md:text-2xl lg:text-4xl font-bold">Developer as a Service</h1>
            <p>Flexible access to skilled developers who integrate seamlessly with your team, helping you scale your projects efficiently without long-term commitments.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
