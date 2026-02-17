import React from "react";
import Link from "next/link";

const CTASection = () => {
const CTAData = {
  title: "Your Glow Journey Starts Here",
  description:
    "Discover modern skincare tools crafted to enhance your natural beauty. Sculpt, soothe, and shine with GlowLuxe.",
  contactBtn: {
    title: "Explore GlowLuxe",
    url: "/shopnow",
  },
};


  return (
    <div className="bg-[#FAF9F6] p-8 md:p-12">
      <div className="bg-gradient-to-br from-[#c4a4a5] via-[#916a6b] to-[#7a595a] mt-8 max-w-7xl mx-auto py-16 md:py-24 rounded-[2.5rem] px-4 text-center min-h-[400px] flex flex-col justify-center shadow-2xl shadow-rose-900/10 relative overflow-hidden">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-white text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            {CTAData.title}
          </h2>

          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            {CTAData.description}
          </p>

          <div className="flex justify-center">
            <Link
              href={CTAData.contactBtn.url}
              className="bg-white text-[#916a6b] font-bold py-4 px-10 rounded-xl hover:bg-gray-50 transition-all shadow-xl hover:scale-105 active:scale-95 text-lg"
            >
              {CTAData.contactBtn.title}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
