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
          <div className="absolute inset-0 bg-black/70"></div>

          {/* Content */}
          <div className="relative container mx-auto px-4 py-20">
            <div className="flex flex-col lg:w-11/12">
              <div className="caption mb-10">
                <h1 className="text-2xl sm:text-4xl font-bold">
                  Top Advertising Agency :
                </h1>
                <h1 className="text-3xl sm:text-5xl font-bold">
                  Elevate Your <span className="text-purple-500">Brand</span>{" "}
                  Today
                </h1>
              </div>
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center md:order-2">
                <img
                  src="/assets/imgs/icon-img/arrow-down-big.png"
                  alt="Arrow Down"
                  className="max-w-[150px]"
                />
              </div>
              <div className="flex justify-center md:justify-end md:order-1">
                <div className="text-center md:text-right">
                  <h2 className="text-4xl font-bold mb-2">6k +</h2>
                  <h6 className="text-lg">
                    Projects completed <br />
                    <span className="text-purple-500">successfully</span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <section className="py-16 bg-white">
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

        <section className="intro section-padding">
          <div className="container">
            <div className="row lg-marg">
              {/* Left Content */}
              <div className="col-lg-8 md-mb80">
                <div className="row lg-marg align-items-center">
                  <div className="col-md-6">
                    <div className="img1 sm-mb50">
                      <img
                        src="/assets/imgs/intro/04.webp"
                        alt="Intro Image"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="text">
                      <h3 className="mb-30">
                        Sham Marianas{" "}
                        <span className="fw-300">
                          Powering Creativity & Boosting Digital Growth with Top
                          Advertising Strategies
                        </span>
                      </h3>
                      <p className="align-text">
                        <span className="text-bold underline main-color">
                          Sham Marianas
                        </span>{" "}
                        is a top advertising agency that helps businesses grow
                        with digital marketing, brand building, and ROI-focused
                        advertising. We employ tried-and-true marketing
                        techniques to increase our internet presence, draw in
                        new clients, and provide tangible outcomes. Let&apos;s
                        grow your company to new heights!
                      </p>

                      <a href="/about" className="underline main-color mt-40">
                        <span className="text">
                          More About Us <i className="ti-arrow-top-right"></i>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Numbers Section */}
                <div className="numbers mt-80">
                  <div className="row lg-marg">
                    <div className="col-md-6">
                      <div className="item bord-thin-top pt-30 d-flex align-items-end mt-20">
                        <div>
                          <h3 className="fw-300 mb-10">100%</h3>
                          <h6 className="p-color sub-title">
                            Clients Satisfaction
                          </h6>
                        </div>
                        <div className="ml-auto">
                          <div className="icon-img-40">
                            <img
                              src="/assets/imgs/arrow-image.webp"
                              alt="Arrow Icon"
                              className="w-10 h-auto"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="item bord-thin-top pt-30 d-flex align-items-end mt-20">
                        <div>
                          <h3 className="fw-300 mb-10">6745</h3>
                          <h6 className="p-color sub-title">
                            Projects Completed
                          </h6>
                        </div>
                        <div className="ml-auto">
                          <div className="icon-img-40">
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
                </div>
              </div>

              {/* Right Image */}
              <div className="col-lg-4">
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
