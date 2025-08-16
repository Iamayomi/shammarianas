import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import Layout from "@/components/Layout";

const stats = [
  { label: "Digital Assets", value: "10,000+" },
  { label: "Happy Customers", value: "50,000+" },
  { label: "Downloads", value: "2M+" },
  { label: "Categories", value: "15+" },
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

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
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
        </section>
      </main>
    </Layout>
  );
}
