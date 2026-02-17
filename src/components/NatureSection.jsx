import React from "react";

const NatureSection = () => {
  const natureData = {
    title: "Pure Elements. Pure Radiance. Pure Skin.",
    bannerVideo: "/videos/nature-video.mp4", // 👈 put your video path here
  };

  return (
    <div className="relative h-screen w-full">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={natureData.bannerVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <h2 className="text-4xl md:text-6xl backdrop-blur-[1px] text-white font-bold tracking-wider text-center px-4">
          {natureData.title}
        </h2>
      </div>
    </div>
  );
};

export default NatureSection;
