import { Splide, SplideSlide } from "@splidejs/react-splide";
import ProjectCard from "../card/ProjectCard";
import "@splidejs/react-splide/css";

export default function OurProjectSection() {
  const projects = [
    {
      id: 1,
      company: "Ivolks Creative",
      name: "Website Company Profile",
      imageUrl: "/projects/ivolks.jpg",
    },
    {
      id: 2,
      company: "Yayasan Maqdis",
      name: "Aplikasi Hamim",
      imageUrl: "/projects/hamim.jpg",
    },
    {
      id: 3,
      company: "BPLJ PUPR",
      name: "Website Layanan Manajemen Rapat",
      imageUrl: "/projects/bplj.jpg",
    },
    {
      id: 4,
      company: "Onifarms",
      name: "Aplikasi Smart Farming",
      imageUrl: "/projects/onifarms.jpg",
    },
    {
      id: 5,
      company: "PT Pertamina Geothermal Energy",
      name: "Website Sosialisasi Sistem Tata Kerja (STK)",
      imageUrl: "/projects/pertamina.jpg",
    },
    {
      id: 6,
      company: "Stylish",
      name: "Aplikasi E-Commerce",
      imageUrl: "/projects/stylish.jpg",
    },
    {
      id: 7,
      company: "Edutrain (PTIPD UIN SGD Bandung)",
      name: "Website Penyedia Sertifikasi",
      imageUrl: "/projects/edutrain.jpg",
    },
  ];

  return (
    <div className="px-[5%] md:px-[3%] pt-[7%] pb-[7%]">
      <p className="text-right text-2xl text-primary-600 font-medium">Our Completed Project</p>
      <div className="flex justify-center w-full pt-[3%]">
        <div className="w-full rounded-lg backdrop-blur-2xl">
          <div className="py-[1%] px-[5%]">
            <Splide
              options={{
                type: "loop",
                perPage: 3,
                perMove: 1,
                gap: "1rem",
                focus: "center",
                arrows: true,
                pagination: false,
                drag: true,
                breakpoints: {
                  1024: {
                    perPage: 2,
                  },
                  768: {
                    perPage: 1,
                  },
                  480: {
                    perPage: 1,
                  },
                },
              }}>
              {projects.map((project) => (
                <SplideSlide key={project.id}>
                  <ProjectCard company={project.company} name={project.name} imageUrl={project.imageUrl} />
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </div>
      </div>
    </div>
  );
}
