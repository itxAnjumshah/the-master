import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";

// Import images
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";

// Slides Data
const slides = [
  { image: img1, text: "Become a certified heavy machinery expert!" },
  { image: img2, text: "Learn from industry professionals with hands-on training." },
  { image: img3, text: "Master trucks, trailers, and construction vehicles." },
  { image: img4, text: "Achieve excellence with our state-of-the-art training equipment." },
  { image: img5, text: "Your gateway to a successful transportation career." },
  { image: img6, text: "Train, practice, and get certified with ease." },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Slider Settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    afterChange: (index) => setCurrentSlide(index), // Update text dynamically
  };

  return (
    <div className="font-[Poppins] relative w-full h-screen overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Slider {...settings} className="w-full h-full">
          {slides.map((slide, index) => (
            <div key={index} className="relative w-full h-screen">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Full-Screen Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/60 to-black/90 z-10"></div>

      {/* Centered Glassmorphism Content */}
      <section
        id="home"
        className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 z-20"
      >
        <div
          className="w-full md:w-3/4 lg:w-1/2 p-8 sm:p-10 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20"
          data-aos="fade-up"
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg"
            data-aos="fade-down"
          >
            The Master Training Center
          </h1>
          <p
            className="text-lg sm:text-xl md:text-2xl mb-6 text-white font-semibold italic drop-shadow-lg transition-opacity duration-1000 ease-in-out"
            data-aos="fade-up"
          >
            {slides[currentSlide].text}
          </p>
        </div>
      </section>
    </div>
  );
}
