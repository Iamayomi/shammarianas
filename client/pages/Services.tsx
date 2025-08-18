import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";

export default function Services() {
  const { user, token } = useAuth();

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const accordionData = [
    {
      title: "Tailored Strategies",
      content:
        "At Sham Marianas, we believe in tailored strategies — because one size never fits all. Backed by in-depth research and the power of AI, we create smart, data-driven solutions that take your brand to the next level with precision and innovation.",
    },
    {
      title: "Expertise",
      content:
        "With over 12 years in brand marketing, we’ve collaborated with diverse industries, offering deep insights and delivering tailored solutions that drive impactful results.",
    },
    {
      title: "Affordable Plans",
      content:
        "We know every business is different, whether you're new or well-established. That's why we offer affordable packages that fit your business's size and needs.",
    },
    {
      title: "Impactful Outcomes",
      content:
        "After working with countless clients, we've learned what truly works. Our team is dedicated to providing solutions that get real, measurable results for your business.",
    },
    {
      title: "At Your Services",
      content:
        "We prioritize your concerns, responding within 24 hours. Our team is always available to assist with any urgent needs or emergencies.",
    },
  ];

  const testimonials = [
    {
      title: "Project Manager",
      text: "With Sham-Marianas expert strategies and innovative solutions, we optimized our operations and unlocked new growth opportunities, setting us on the path to success.",
      name: "Rami Al-Hassan",
      role: "Project Manager",
      image: "/assets/imgs/testim/t2.jpg",
    },
    {
      title: "Business Development Director",
      text: "Working with Sham Marianas has been an absolute game-changer! Their team’s creativity and strategic brilliance completely transformed our brand identity",
      name: "Faisal Nasser",
      role: "Business Development Director",
      image: "/assets/imgs/testim/t3.jpg",
    },
    {
      title: "Chief Marketing Officer (CMO)",
      text: "We gave Sham-Marianas a challenging task—to simplify a complex issue and engage key stakeholders. They delivered an innovative, compelling solution that captured attention and drove results.",
      name: "Omar Farid",
      role: "Chief Marketing Officer (CMO)",
      image: "/assets/imgs/testim/t4.jpg",
    },

    {
      title: "Executive Assistant (Germany)",
      text: "Sham-Marianas impressed us with their unique and innovative approach. Their solution received overwhelming praise from our leadership team.",
      name: "Anja Schmidt",
      role: "Executive Assistant (Germany)",
      image: "/assets/imgs/testim/1.jpg",
    },
    {
      title: "On-page SEO Specialist (Germany)",
      text: "Sham-MarianSall delivered impactful and creative solutions that strengthened our community outreach efforts.",
      name: "Julia Müller",
      role: "On-page SEO Specialist (Germany)",
      image: "/assets/imgs/testim/t1.jpg",
    },
  ];

  const services = [
    {
      num: "01",
      slug: "branding",
      category: "Branding Design",
      title: "Creative Identity",
      description:
        "Our branding design creates strong brand identities that attract audiences, build recognition, and grow businesses for long-term success.",
      img: "/assets/imgs/serv-img/1.jpg",
    },
    {
      num: "02",
      slug: "uiux-design",
      category: "UI-UX Design",
      title: "User Experience",
      description:
        "We offer UI/UX design that creates smooth, user-friendly experiences that boost engagement, conversions, and brand success, making every interaction seamless and enjoyable.",
      img: "/assets/imgs/serv-img/2.jpg",
    },
    {
      num: "03",
      slug: "web-design",
      category: "Web Development",
      title: "Innovative Solutions",
      description:
        "At Sham Marianas, we build cutting-edge web development solutions that blend innovation, performance, and seamless user experiences to help businesses thrive online.",
      img: "/assets/imgs/serv-img/3.jpg",
    },
    {
      num: "04",
      slug: "ecommerce",
      category: "E-Commerce Solutions",
      title: "Seamless Shopping",
      description:
        "We build e-commerce solutions that make online selling seamless and profitable. Our expert services enhance customer reach, conversions, and sales growth",
      img: "/assets/imgs/serv-img/4.jpg",
    },
    {
      num: "05",
      slug: "content",
      category: "Content Writing",
      title: "SEO-Optimized Content",
      description:
        "We create SEO-friendly content writing that captures attention, builds authority, and boosts online presence.",
      img: "/assets/imgs/serv-img/5.jpg",
    },
    {
      num: "06",
      slug: "product",
      category: "Product Design",
      title: "User-Centric Design",
      description:
        "We provide the best product design, creating seamless, user-focused experiences that drive engagement, innovation, and business success.",
      img: "/assets/imgs/serv-img/6.jpg",
    },
    {
      num: "07",
      slug: "digital",
      category: "Social Media & Digital Marketing",
      title: "Brand Growth",
      description:
        "We help businesses grow with social media & digital marketing, increasing brand awareness, interaction, and online reach.",
      img: "/assets/imgs/serv-img/7.jpg",
    },
    {
      num: "08",
      slug: "video-production",
      category: "Photography & Video Production",
      title: "Visual Storytelling",
      description:
        "We deliver photography & video production that captures your brand’s story, enhancing engagement, visibility, and trust with high-impact visuals.",
      img: "/assets/imgs/serv-img/8.jpg",
    },
    {
      num: "09",
      slug: "vfx",
      category: "VFX and CGI ADs",
      title: "High-Impact Visuals",
      description:
        "We design eye-catching VFX and CGI ads that boost brand visibility, engagement, and audience impact with stunning, high-quality visuals.",
      img: "/assets/imgs/serv-img/9.jpg",
    },
    {
      num: "10",
      slug: "printing",
      category: "Print Media Solution",
      title: "Effective Branding",
      description:
        "We craft print media solutions that boost brand visibility, marketing impact, and audience engagement with high-quality designs and materials.",
      img: "/assets/imgs/serv-img/10.jpg",
    },
  ];

  // if (loading) {
  //   return (
  //     <Layout>
  //       <div className="min-h-[60vh] flex items-center justify-center">
  //         <div className="text-center">
  //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
  //           <p className="text-gray-400">Loading services...</p>
  //         </div>
  //       </div>
  //     </Layout>
  //   );
  // }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Header */}
        <header
          className="page-header bg-img section-padding valign"
          style={{
            backgroundImage: "url('/assets/imgs/background/bg4.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container pt-80">
            <div className="row">
              <div className="col-12">
                <div className="text-center">
                  <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Our Services
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className=" text-white py-16">
          <div className="container mx-auto px-6 lg:px-20 mt-16">
            {/* Header */}
            <p className="text-purple-400 uppercase tracking-widest text-sm mb-2">
              Our Specializations
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-12  border-b border-gray-800 pb-12">
              Featured <span className="font-light">Services</span>
            </h2>

            {/* Service List */}
            <div className="space-y-16">
              {services.map((service, index) => (
                <div
                  key={service.slug}
                  className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 border-b pb-12"
                >
                  {/* Left Side */}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 flex items-center justify-center border rounded-full border-gray-600 text-sm">
                        {service.num}
                      </div>
                      <span className="text-purple-400 uppercase text-sm tracking-wide">
                        {service.category}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4">
                      <span className="font-extrabold">
                        {service.title.split(" ")[0]}
                      </span>{" "}
                      {service.title.split(" ").slice(1).join(" ")}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed max-w-lg">
                      {service.description}
                    </p>
                  </div>

                  {/* Right Side (Image) */}
                  <div className="flex justify-center">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="rounded-full w-80 h-48 object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* why choose us Section */}
        <section className="py-20 bg-black text-white border-b">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center mt-12">
            {/* Left Image */}
            <div className="relative">
              <img src="/assets/imgs/arw2.png" alt="arrow design" />
            </div>

            {/* Right Content */}
            <div className="p-6">
              <h6 className="uppercase text-purple-400 mb-6">Why choose us?</h6>
              <h3 className="text-3xl md:text-4xl font-bold mb-10">
                We exceed expectations by blending creativity,
                <br />
                expertise, and innovation to drive your success.
              </h3>

              <div className="divide-y divide overflow-hidden border-t border-b">
                {accordionData.map((item, index) => (
                  <div key={index}>
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex justify-between items-center py-4 px-6 text-left focus:outline-none"
                    >
                      <h6 className="text-lg font-semibold">{item.title}</h6>
                      <span className="text-xl">
                        {openIndex === index ? "x" : "+"}
                      </span>
                    </button>

                    <div
                      className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                        openIndex === index ? "max-h-40 pb-4" : "max-h-0"
                      }`}
                    >
                      <p className="text-gray-300">{item.content}</p>
                    </div>
                  </div>
                ))}
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
                  Testimonials
                </p>
                <h2 className="text-4xl uppercase font-bold">
                  Trusted{" "}
                  <span className="text-white font-medium">By Clients</span>
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
              {testimonials.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden flex flex-col h-full">
                    {/* Top Content */}
                    <div className="px-6 py-10 flex-1">
                      <h3 className="uppercase text-xs font-semibold tracking-wide mb-4">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-xl leading-relaxed">
                        {item.text}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-4 p-6 border-t rounded-xl border-neutral-800 bg-neutral-900">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
                      />
                      <div>
                        <p className="font-semibold text-white">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </div>
    </Layout>
  );
}
