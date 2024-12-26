import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <>
      {/* <div className="hidden md:block">
        <div className="relative flex flex-col md:flex justify-center items-center h-screen lg:pt-[4%]">
          <Image
            src={"https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            className="w-[85%] md:w-2/3 lg:w-[80%] lg:h-[90%] object-cover rounded-[100px]"
            width={1000}
            height={1000}
            alt="Hero Section"
            priority
          />

          <div className="absolute text-white max-w-full px-4 text-center clear-start w-[85%] lg:w-2/3">
            <div className="flex flex-col gap-[5%]">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Where Vision Meets Code: Building Top-notch Software with Expert Developers</h1>
                <p className="mt-2 hidden md:block">
                  CODE.ID is a software development service company where our expert team of developers passionately transforms your boldest ideas into innovative, state-of-the-art products, applications, and websites.
                </p>
              </div>
              <div className="flex justify-center gap-[3%] pt-[7%]">
                <button className="py-2 px-4 border border-primary-400 rounded-full hover:bg-primary-600">Contact Us</button>
                <button className="py-2 px-4 bg-white text-black rounded-full hover:bg-primary-600 hover:text-white">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden h-screen">
        <div className="relative flex flex-col items-center pt-[50%]">
          <div>
            <Image
              src={"https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              className="w-[85%] object-cover rounded-2xl"
              width={1000}
              height={1000}
              alt="Hero Section"
              priority
            />
            <div className="absolute text-white max-w-full px-4 text-center clear-start w-[85%]">
              <h1 className="text-3xl md:text-4xl font-bold">Where Vision Meets Code: Building Top-notch Software with Expert Developers</h1>
            </div>
          </div>
          <p className="text-black md:hidden">
            CODE.ID is a software development service company where our expert team of developers passionately transforms your boldest ideas into innovative, state-of-the-art products, applications, and websites.
          </p>
        </div>
      </div> */}
      <div className="relative">
        {/* Background Image */}
        <Image src={"/hero/background.jpg"} className="w-full h-screen object-cover opacity-50" width={1000} height={1000} quality={100} alt="Hero" priority />

        {/* Black Transparent Overlay */}
        <div className="absolute inset-0 bg-black opacity-80"></div>

        {/* Content */}
        <div className="absolute inset-0 text-white flex flex-col gap-[4%] justify-center w-full items-center px-[5%] lg:px-[20%] text-center">
          <h1 className="text-2xl md:text-6xl font-bold">Let Us Make Fit Product Based On Your Vision</h1>
          <p className="text-xs text-center lg:px-[15%] md:text-base">
            Prambanan Digital is a software development service company where can execute your vision as fit as possible. Pay for feature you need and Save time without developing unnecessary feature that you don&apos;t need.
          </p>
          <div className="flex gap-4 md:gap-10">
            <Link href={"#contact"} className="text-lg px-7 py-3 bg-primary-400 rounded-full hover:bg-primary-600">
              Request Demo
            </Link>
            {/* <Link href={"#services"} className="px-5 py-2 bg-primary-400 rounded-full hover:bg-primary-600">
              Learn More
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
}
