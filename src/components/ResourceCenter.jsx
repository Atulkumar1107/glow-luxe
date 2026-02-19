"use client";

import React from "react";

const ResourceCenter = () => {
  const title = "Why GlowLuxe Works";
  const description =
    "Our beauty tools are designed to improve circulation, boost hydration absorption, and visibly enhance skin texture — giving you spa-level results at home.";

  const viewBtn = {
    title: "Know About GlowLuxe",
    url: "/aboutus",
  };

  // ✅ Now 3 Proper Images
  const images = [
    {
      url: "https://res.cloudinary.com/dwau5poqz/image/upload/v1771518269/benefits_of_facial_rolling_y05juv.webp",
    },
    {
      url: "https://res.cloudinary.com/dwau5poqz/image/upload/v1771518356/TTc6LecH1NuTYBXFNLazCHvZ1YuJAYWfcHeDvtAFdpcmz6pMCIPmbwJ5wB8mkrPRFjdyADhurOET4xBcRpuv1rm-J_d1qUGmfex6HyZF-dc_1_ipcdja.jpg",
    },
    {
      url: "https://res.cloudinary.com/dwau5poqz/image/upload/v1771518113/SvEGv0wPkRxesIOwDLpoyZFf1-7G8Og-rp40lomFaSWYwk7fJGCwD86KnBuaq4I4wIWCwrzX1ZYUfzOgekgBrMSLNo2TZa2zxGoxV3ozNAU_l166b2.jpg",
    },
  ];

  return (
    <div className="bg-[#FFF5F6] py-24 md:py-32 border-y border-gray-100/50">
      <div className="container max-w-[1370px] mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* LEFT CONTENT */}
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#D3969B] tracking-tight">
              {title}
            </h2>

            <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
              {description}
            </p>

            <a
              href={viewBtn.url}
              className="bg-[#D3969B] text-white px-10 py-4 rounded-xl hover:bg-[#B06A72] transition-all duration-300 font-bold shadow-lg hover:shadow-xl inline-block"
            >
              {viewBtn.title}
            </a>
          </div>

          {/* RIGHT IMAGES GRID */}
          <div className="grid grid-cols-2 gap-4 max-w-3xl">
            <img
              src={images[0].url}
              alt="GlowLuxe Resource 1"
              className="rounded-2xl object-cover w-full h-80 shadow-lg"
            />

            <img
              src={images[1].url}
              alt="GlowLuxe Resource 2"
              className="rounded-2xl object-cover w-full h-72 mt-4 shadow-lg"
            />

            <img
              src={images[2].url}
              alt="GlowLuxe Resource 3"
              className="rounded-2xl object-cover w-full h-56 col-span-2 mt-4 shadow-lg"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResourceCenter;
