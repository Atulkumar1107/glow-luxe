import ContactSection from "@/components/ContactSection";
import Header from "@/components/Header";
import React from "react";

import {
  contactHeaderData,
  contactSidebarData,
} from "@/data/contactData";

export default function ContactPage() {
  const { section } = contactHeaderData;

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-[100px] pb-16 px-4 sm:px-6 lg:px-8">
      <Header forceDark={true} />

      <div className="max-w-3xl mt-16 mb-10 mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-black text-[#916a6b] mb-5 uppercase tracking-tight">
          {section.title}
        </h1>

        <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
          {section.description}
        </p>
      </div>

      <div className="-mt-12">
        <ContactSection contactData={contactSidebarData} />
      </div>
    </div>
  );
}
