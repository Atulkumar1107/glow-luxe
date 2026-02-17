'use client'
import React, { useState, useEffect } from "react";

const HeroSection = () => {
  const [currentVideo, setCurrentVideo] = useState(0);

  // 🔥 Hardcoded Data
  const greet = "Welcome to Yegg Peg";
  const description =
    "Premium botanical skincare designed for natural radiance and holistic well-being.";

  const logoUrl = "/images/logo.png"; // make sure this exists in public/images
  const shopUrl = "/shopnow";

  const videos = ["https://res.cloudinary.com/dwau5poqz/video/upload/v1771330134/9697877-uhd_3840_2160_25fps_idzjbz.mp4"]; // place video inside public/videos

  useEffect(() => {
    if (videos.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      <div className="relative min-h-screen">
        <div className="relative h-screen overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>

          {videos.map((videoUrl, index) => (
            <video
              key={index}
              src={videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentVideo ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="mb-6">
              <img
                src={logoUrl}
                alt="Yegg Peg Logo"
                className="mx-auto h-20 md:h-28 w-auto"
              />
            </div>

            <p className="text-xl max-w-3xl md:text-2xl text-white mb-8">
              {greet}
              <br />
              {description}
            </p>

            <a
              href={shopUrl}
              className="px-8 py-3 rounded-2xl bg-transparent border-2 border-white text-white font-bold hover:bg-[#609966] hover:text-black transition-colors duration-300"
            >
              Shop Now
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HeroSection;
