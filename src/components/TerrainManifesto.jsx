import React from "react";

const TerrainManifesto = () => {
const terrainData = {
  title: "Where Science Meets Soft Beauty",
  description:
    "GlowLuxe brings together innovative beauty tools and skin-loving formulas to create a luxurious self-care ritual. Designed for modern women, our products help reduce puffiness, boost hydration, and reveal a radiant, confident glow every day.",
};


  return (
    <div className="bg-[#FAF9F6] py-24 px-4 md:px-8 border-y border-gray-100/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl text-[#916a6b] font-extrabold md:text-5xl text-center mb-8 tracking-tight">
          {terrainData.title}
        </h2>

        <p className="text-lg md:text-xl text-gray-600 text-center leading-relaxed font-medium max-w-3xl mx-auto">
          {terrainData.description}
        </p>
      </div>
    </div>
  );
};

export default TerrainManifesto;
