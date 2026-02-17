import React from "react";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import { privacyPageData } from "@/data/privacyData";

export default function Privacy() {
  const { hero, content } = privacyPageData;

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Header forceDark={true} />

      {/* Hero Banner Section */}
      <div className="relative h-96 flex items-center justify-center text-white">
        
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${hero.backgroundImage})`,
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Content */}
        <div className="relative z-20 text-center">
          <h1 className="text-5xl font-black mb-4 uppercase tracking-tight">{hero.title}</h1>

          <div className="flex items-center justify-center gap-2 text-lg">
            {hero.breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {item.link ? (
                  <a
                    href={item.link}
                    className="hover:text-[#916a6b] transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-[#916a6b] font-bold">{item.label}</span>
                )}
                {index < hero.breadcrumb.length - 1 && (
                  <ChevronRight size={20} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="prose max-w-none">

          <h2 className="text-gray-900 text-xl mb-8 font-medium">
            {content.intro}
          </h2>

          <ol className="list-decimal text-lg space-y-4 text-gray-800">
            {content.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ol>

          <div className="mt-8 text-xl text-gray-900 font-bold border-t border-gray-100 pt-8">
            {content.note}
          </div>

        </div>
      </div>
    </div>
  );
}
