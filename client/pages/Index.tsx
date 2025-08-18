import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navigation } from "swiper/modules";
import { Button } from "@/components/ui/button";

import Layout from "@/components/Layout";

const teams = [
  {
    img: "/assets/imgs/team/1.jpg",
    name: "Robert De Niro",
    subName: "Web Developer",
  },
  {
    img: "/assets/imgs/team/02.png",
    name: "Ehtasham ul haq",
    subName: "CEO - CCO - CFO",
  },
  {
    img: "/assets/imgs/team/3.jpg",
    name: "Ahmed Khaled",
    subName: "Web Designer",
  },
];

const stats = [
  { label: "Digital Assets", value: "10,000+" },
  { label: "Happy Customers", value: "50,000+" },
  { label: "Downloads", value: "2M+" },
  { label: "Categories", value: "15+" },
];

const data = [
  {
    title: "1. Branding Design",
    img: "/assets/imgs/serv-icons/3.png",
    desc: "Our branding design creates strong brand identities that attract audiences, build recognition, and grow businesses for long-term success.",
    link: "#services/branding",
  },
  {
    title: "2. UI-UX Design",
    img: "/assets/imgs/serv-icons/5.png",
    desc: "We offer UI/UX design that creates smooth, user-friendly experiences that boost engagement, conversions, and brand success, making every interaction seamless and enjoyable.",
    link: "#services/uiux-design",
  },
  {
    title: "3. Web Developments",
    img: "/assets/imgs/serv-icons/4.png",
    desc: "At Sham Marianas, we build cutting-edge web development solutions that blend innovation, performance, and seamless user experiences to help businesses thrive online.",
    link: "#services/web-design",
  },
  {
    title: "4. E-Commerce Solutions",
    img: "/assets/imgs/serv-icons/5.png",
    desc: "We build e-commerce solutions that make online selling seamless and profitable. Our expert services enhance customer reach, conversions, and sales growth",
    link: "#services/ecommerce",
  },
  {
    title: "5. Content Writing",
    img: "/assets/imgs/serv-icons/3.png",
    desc: "We create SEO-friendly content writing that captures attention, builds authority, and boosts online presence.",
    link: "#services/content",
  },
  {
    title: "6. Product Design",
    img: "/assets/imgs/serv-icons/5.png",
    desc: "We provide the best product design, creating seamless, user-focused experiences that drive engagement, innovation, and business success.",
    link: "#services/product",
  },
  {
    title: "7. Social Media & Digital Marketing",
    img: "/assets/imgs/serv-icons/4.png",
    desc: "We help businesses grow with social media & digital marketing, increasing brand awareness, interaction, and online reach.",
    link: "#services/digital",
  },
  {
    title: "8. Photography & Video Production",
    img: "/assets/imgs/serv-icons/5.png",
    desc: "We deliver photography & video production that captures your brand’s story, enhancing engagement, visibility, and trust with high-impact visuals.",
    link: "#services/video-production",
  },
  {
    title: "9. VFX and CGI ADs",
    img: "/assets/imgs/serv-icons/4.png",
    desc: "We design eye-catching VFX and CGI ads that boost brand visibility, engagement, and audience impact with stunning, high-quality visuals.",
    link: "#services/vfx",
  },
  {
    title: "10. Print Media Solution",
    img: "/assets/imgs/serv-icons/5.png",
    desc: "We craft print media solutions that boost brand visibility, marketing impact, and audience engagement with high-quality designs and materials.",
    link: "#services/printing",
  },
];

export default function Index() {
  return (
    <Layout>
      <main className="main-bg o-hidden">
        {/* Hero Section */}
        <header
          className="relative bg-cover bg-center bg-no-repeat text-white"
          style={{ backgroundImage: "url('/assets/imgs/background/bg5.jpg')" }}
        >
          {/* Dark overlay */}
          {/* <div className="absolute inset-0 bg-black/70"></div> */}

          {/* Content */}
          <div className="relative container mx-auto px-5 py-10 sm:py-20">
            <div className="flex flex-col w-full sm:w-11/12 mx-auto my-6 sm:my-10">
              <div className="caption mb-6 sm:mb-10 text-center sm:text-left">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-8 md:mb-12">
                  Top Advertising Agency :
                </h1>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                  Elevate Your <span className="text-purple-500">Brand</span>{" "}
                  Today
                </h1>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:justify-between sm:m-0 max-w-6xl mx-auto">
              {/* Arrow Down */}
              <div className="flex justify-center sm:justify-start order-2 sm:order-1 sm:ml-12 mt-6 sm:mt-0">
                <img
                  src="/assets/imgs/icon-img/arrow-down-big.png"
                  alt="Arrow Down"
                  className="w-[100px] sm:max-w-[150px]"
                />
              </div>

              {/* Text Section */}
              <div className="flex justify-center sm:justify-end order-1 sm:order-2">
                <div className="text-start">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-2">6k +</h2>
                  <h6 className="text-base sm:text-lg">
                    Projects completed <br />
                    <span className="text-purple-500">successfully</span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <section className="py-16  bg-black/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="intro section-padding m-12">
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:gap-12">
              {/* Left Content */}
              <div className="w-full lg:w-8/12 mb-10 lg:mb-0">
                <div className="flex flex-col md:flex-row items-center gap-10">
                  <div className="w-full md:w-1/2">
                    <div className="img1">
                      <img
                        src="/assets/imgs/intro/04.webp"
                        alt="Intro Image"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="text">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug mb-6">
                        Sham Marianas{" "}
                        <span className="font-light block sm:inline">
                          Powering Creativity & Boosting Digital Growth with Top
                          Advertising Strategies
                        </span>
                      </h3>
                      <p className="align-text text-justify text-sm leading-relaxed tracking-wide mt-6 mb-8">
                        <span className=" text-purple-500 text-lg">
                          Sham Marianas
                        </span>{" "}
                        is a top advertising agency that helps businesses grow
                        with digital marketing, brand building, and ROI-focused
                        advertising. We employ tried-and-true marketing
                        techniques to increase our internet presence, draw in
                        new clients, and provide tangible outcomes. Let&apos;s
                        grow your company to new heights!
                      </p>

                      <Link
                        to="/about"
                        className="underline text-purple-500 mt-40"
                      >
                        <span className="text">
                          More About Us <i className="ti-arrow-top-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Numbers Section */}
                <div className="numbers mt-16">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 border-t pt-6 flex items-end gap-4">
                      <div>
                        <h3 className="text-2xl mb-2">100%</h3>
                        <h6 className="font-bold">Clients Satisfaction</h6>
                      </div>
                      <div className="ml-auto">
                        <img
                          src="/assets/imgs/arrow-image.webp"
                          alt="Arrow Icon"
                          className="w-10 h-auto"
                        />
                      </div>
                    </div>

                    <div className="flex-1 border-t pt-6 flex items-end gap-4">
                      <div>
                        <h3 className="text-2xl mb-2">6745</h3>
                        <h6 className="font-bold">Projects Completed</h6>
                      </div>
                      <div className="ml-auto">
                        <img
                          src="/assets/imgs/arrow-image.webp"
                          alt="Arrow Icon"
                          className="w-10 h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="w-full lg:w-4/12">
                <div className="img-full fit-img">
                  <img
                    src="/assets/imgs/intro/04.jpg"
                    alt="Full Image"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className=" text-white py-20 relative ">
          <div className="container mx-auto px-6 mt-10">
            {/* Section Header */}
            <div className="flex justify-between items-center mb-12">
              <div>
                <p className="text-purple-400 uppercase tracking-widest text-sm mb-4">
                  Our Specialize
                </p>
                <h2 className="text-4xl uppercase font-bold">
                  Featured{" "}
                  <span className="text-white font-medium">Services</span>
                </h2>
              </div>

              {/* Custom Navigation */}
              <div className="flex gap-4">
                <button className="swiper-button-prev-custom w-10 h-10 flex items-center justify-center rounded-full border border-gray-700 bg-neutral-900 hover:bg-purple-500 transition">
                  <ArrowLeft size={18} />
                </button>
                <button className="swiper-button-next-custom w-10 h-10 flex items-center justify-center rounded-full border border-gray-700 bg-neutral-900 hover:bg-purple-500 transition">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Swiper */}
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              spaceBetween={30}
              slidesPerView={3}
              loop
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {data.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <div className=" border border-neutral-800 rounded-xl overflow-hidden flex flex-col h-full px-2 py-6  min-h-96">
                    <div className="m-6">
                      <div className="icon mb-10 opacity-50">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-16 h-16 "
                        />
                      </div>
                      <h5 className="mb-4 text-white text-2xl font-semibold">
                        {item.title}
                      </h5>
                      <p className="text-neutral-400 text-lg leading-relaxed">
                        {item.desc}
                      </p>
                      <a
                        href={item.link}
                        className="rmore mt-auto pt-6 flex items-center"
                      >
                        <span className="sub-title text-sm">Read More</span>
                        <img
                          src="/assets/imgs/arrow-right.png"
                          alt="Arrow"
                          className="icon-img-20 ml-2 w-5 h-5"
                        />
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section className="bg-black text-white">
          {/* Header Section */}
          <div className="container py-8 flex items-center justify-between -mt-16">
            <div>
              <span className="sub-title text-purple-400 text-sm uppercase">
                Our Team
              </span>
              <h3 className="text-4xl md:text-5xl font-bold uppercase">
                Meet Our <span className="font-medium">Legends</span>
              </h3>
            </div>
            <a
              href="#about"
              className="rounded-full border border-white text-white px-4 py-2 hover:bg-white hover:text-black transition-colors flex items-center"
            >
              <span>JOIN US</span>
              <span className="ml-2">↗</span>
            </a>
          </div>

          {/* Team Members Section */}
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {teams.map((item, i) => (
                <div key={i} className="relative group text-center">
                  {/* Image card */}
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Bottom glass name/role bar */}
                    <div
                      className="absolute left-1/2 bottom-4 -translate-x-1/2
                    px-6 py-3 rounded-xl text-left
                    bg-white/10 backdrop-blur-xl ring-1 ring-white/10
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      <span className="block text-xs text-white/80">
                        {item.subName}
                      </span>
                      <h6 className="text-lg font-semibold">{item.name}</h6>
                    </div>
                  </div>

                  {/* RIGHT-SIDE FLOATING SOCIAL PILL (outside the card edge) */}
                  <div
                    className="absolute top-1/2 -right-8 -translate-y-1/2
               opacity-0 translate-x-8
               group-hover:opacity-100 group-hover:translate-x-0
               transition-all duration-500 pointer-events-none
               md:pointer-events-auto"
                  >
                    <div className="relative rotate-6 group-hover:rotate-0 transition-transform duration-500">
                      <div className="absolute -left-6 top-10 w-16 h-16 bg-purple-400/40 rounded-full blur-2xl"></div>

                      {/* glass pill */}
                      <div
                        className="relative flex flex-col items-center gap-3
                      px-3 py-4 rounded-2xl
                      bg-white/6 backdrop-blur-xl ring-1 ring-white/10 shadow-2xl"
                      >
                        <a
                          href="https://www.youtube.com/c/ShamMarianasSM"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 grid place-items-center rounded-full
                     bg-white/10 hover:bg-white/20 transition
                     hover:text-purple-500"
                        >
                          <i className="fab fa-youtube"></i>
                        </a>
                        <a
                          href="https://www.behance.net/shammarianas"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 grid place-items-center rounded-full
                     bg-white/10 hover:bg-white/20 transition
                     hover:text-purple-500"
                        >
                          <i className="fab fa-behance"></i>
                        </a>
                        <a
                          href="https://www.instagram.com/sham_marianas/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 grid place-items-center rounded-full
                     bg-white/10 hover:bg-white/20 transition
                     hover:text-purple-500"
                        >
                          <i className="fab fa-instagram"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4 m-6">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-semibold">
                We&apos;re proud to work with <br />
                <span className="opacity-70">
                  a diverse range of companies.
                </span>
              </h3>
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* LEFT - Swiper Logos */}
              <div className="lg:col-span-2">
                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                  }}
                  spaceBetween={40}
                  slidesPerView={5}
                  loop
                  breakpoints={{
                    0: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 5 },
                  }}
                  className="w-full"
                >
                  <SwiperSlide>
                    <div className="flex justify-center">
                      <img
                        src="/assets/imgs/brands/02.png"
                        alt="brand"
                        className="h-40 w-56 object-contain"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="flex justify-center">
                      <img
                        src="/assets/imgs/brands/03.png"
                        alt="brand"
                        className="h-40 w-56 object-contain"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="flex justify-center">
                      <img
                        src="/assets/imgs/brands/04.png"
                        alt="brand"
                        className="h-40 w-56 object-contain"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="flex justify-center">
                      <img
                        src="/assets/imgs/brands/05.png"
                        alt="brand"
                        className="h-40 w-56 object-contain"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="flex justify-center">
                      <img
                        src="/assets/imgs/brands/06.png"
                        alt="brand"
                        className="h-40 w-56 object-contain"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="flex justify-center">
                      <img
                        src="/assets/imgs/brands/07.png"
                        alt="brand"
                        className="h-40 w-56 object-contain"
                      />
                    </div>
                  </SwiperSlide>
                </Swiper>

                <div className="flex mt-8 flex-col items-center">
                  <div className="border rounded-full p-4">
                    More than <span className="font-bold">200+ companies </span>
                    trusted us worldwide{" "}
                  </div>
                  .<div className="border-b w-full -mt-12"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {/* <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Join our community today and get access to thousands of premium
              digital assets. Start your creative journey with shammarianas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="px-8">
                  Sign Up Free
                </Button>
              </Link>
              <Link to="/explore">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-purple-600 px-8"
                >
                  Browse Assets
                </Button>
              </Link>
            </div>
          </div>
        </section> */}
      </main>
    </Layout>
  );
}
