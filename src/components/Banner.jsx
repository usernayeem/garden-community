import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const PrevArrow = props => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full flex items-center justify-center transition-all`}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};

const NextArrow = props => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full flex items-center justify-center transition-all`}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
};

export const Banner = () => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    appendDots: dots =>
      <div>
        <ul className="flex justify-center items-center absolute bottom-6 left-1/2 -translate-x-1/2">
          {dots}
        </ul>
      </div>,
    customPaging: i =>
      <div className="w-3 h-3 mx-1 rounded-full bg-white bg-opacity-50 hover:bg-opacity-100" />,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrows: false
        }
      }
    ]
  };

  // Slide data
  const slides = [
    {
      id: 1,
      title: "Spring Garden Festival",
      description:
        "Join us for workshops, plant sales, and garden tours in our annual celebration of spring blooms.",
      date: "May 25-27, 2025 • Central Community Garden",
      buttonText: "Register Now"
    },
    {
      id: 2,
      title: "Autumn Harvest Workshop",
      description:
        "Learn how to maximize your fall harvest and prepare your garden for winter with our expert gardeners.",
      date: "September 22-23, 2025 • Urban Farming Center",
      buttonText: "Book Your Spot"
    },
    {
      id: 3,
      title: "Garden Photography Contest",
      description:
        "Show off your garden's beauty and creativity in our annual photography competition with prizes for multiple categories.",
      date: "Submissions open until July 31, 2025",
      buttonText: "Submit Photos"
    }
  ];

  return (
    <div className="w-full">
      <Slider {...settings}>
        {slides.map(slide =>
          <div
            key={slide.id}
            className="relative h-96 md:h-[500px] outline-none"
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center bg-blue-400" />

            {/* Content */}
            <div className="relative flex flex-col justify-center items-center h-full px-4 md:px-6 text-center text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl mb-6 max-w-2xl">
                {slide.description}
              </p>
              <p className="text-md md:text-lg mb-8">
                {slide.date}
              </p>
            </div>
          </div>
        )}
      </Slider>
    </div>
  );
};
