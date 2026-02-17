import React from "react";

const ThetaStateSection = () => {
  const thetaData = {
    backImage: "https://res.cloudinary.com/dwau5poqz/image/upload/v1771330714/pexels-rdne-8183916_eisrkg.jpg",
    title: "YEGG PEG SKINCARE",
    heading: "Glow with Natural Radiance",
    description:
      "Our advanced botanical formulas are designed with precision and premium organic extracts to provide deep hydration, firming, and a natural glow that lasts.",
    viewBtn: {
      title: "View Products",
      url: "/shopnow",
    },
  };

  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${thetaData.backImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      
      {/* Light Backdrop Blur Overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] z-0" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-6 flex justify-end">
          <div className="bg-[#FAF9F6] rounded-2xl p-12 max-w-xl shadow-xl border border-white/50 backdrop-blur-sm">
            <div className="text-[#916a6b] uppercase tracking-[0.2em] text-xs font-bold mb-4">
              {thetaData.title}
            </div>

            <h2 className="text-4xl text-[#916a6b] font-extrabold mb-6 leading-tight tracking-tight">
              {thetaData.heading}
            </h2>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed font-medium">
              {thetaData.description}
            </p>

            <a
              href={thetaData.viewBtn.url}
              className="bg-[#916a6b] text-white px-10 py-4 rounded-xl hover:bg-[#7a595a] transition-all duration-300 font-bold shadow-lg inline-block"
            >
              {thetaData.viewBtn.title}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThetaStateSection;
