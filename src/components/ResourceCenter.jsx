"use client";

import React from "react";

const ResourceCenter = () => {
  // 🔥 HARDCODED DATA
  const title = "Skincare Resource Center";
  const description =
    "Explore skin health guides, botanical insights, and expert rituals designed to help you achieve natural radiance with confidence.";
  
  const viewBtn = {
    title: "Explore Resources",
    url: "/resources",
  };

  const images = [
    { url: "/images/resource_1.jpg" },
    { url: "/images/resource_2.jpg" },
  ];

  return (
    <div className="bg-[#FAF9F6] py-24 md:py-32 border-y border-gray-100/50">
      <div className="container max-w-[1370px] mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* LEFT CONTENT */}
          <div className="max-w-2xl">
            <h2 className="text-5xl font-extrabold mb-6 text-[#916a6b] tracking-tight">
              {title}
            </h2>

            <p className="text-gray-600 text-xl mb-8 leading-relaxed">
              {description}
            </p>

            <a
              href={viewBtn.url}
              className="bg-[#916a6b] text-white px-10 py-4 rounded-xl hover:bg-[#7a595a] transition-all duration-300 font-bold shadow-lg hover:shadow-xl inline-block"
            >
              {viewBtn.title}
            </a>
          </div>

          {/* RIGHT IMAGES GRID */}
          <div className="grid grid-cols-2 gap-4 max-w-3xl">
            <img
              src={images[0].url}
              alt="Resource 1"
              className="rounded-lg object-cover w-full h-80"
            />

            <img
              src={images[1].url}
              alt="Resource 2"
              className="rounded-lg object-cover w-full h-70 mt-4"
            />

            <img
              src={images[0].url}
              alt="Resource 3"
              className="rounded-lg object-cover w-full h-48 col-span-2 mt-4"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResourceCenter;
