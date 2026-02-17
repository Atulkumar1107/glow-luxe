import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./AccordionFaq";

const BulletList = ({ items }) => (
  <ul className="list-none space-y-3">
    {items.map((item, index) => (
      <li key={index} className="flex items-center">
        <div className="w-2 h-2 bg-[#916a6b] rounded-full mr-3"></div>
        <span className="text-gray-600 font-medium">{item}</span>
      </li>
    ))}
  </ul>
);

const FAQSection = () => {
  const FAQData = {
    heading: "Frequently Asked Questions",
    info: "Everything you need to know about the Yegg Peg Botanical Skincare Collection.",
    items: [
      {
        question: "What are your products made of?",
        answer:
          "Our products are crafted from 100% organic, botanical extracts and premium natural ingredients for maximum efficacy and skin harmony.",
        type: "text",
      },
      {
        question: "Are they suitable for all skin types?",
        answer: [
          "Dermatologist tested for sensitive skin",
          "Balanced pH formulas",
          "Non-comedogenic (won't clog pores)",
          "Free from parabens and sulfates",
        ],
        type: "list",
        introduction:
          "Yes, our collection is designed to be gentle yet effective across all skin concerns:",
      },
      {
        question: "Is your packaging sustainable?",
        answer:
          "Yes, we use eco-friendly, recyclable materials for all our packaging to reduce our environmental footprint.",
        type: "text",
      },
      {
        question: "How soon can I see results?",
        answer:
          "While individual results vary, most users report a noticeable improvement in skin hydration and radiance within 7-14 days of consistent use.",
        type: "text",
      },
    ],
  };

  const renderAnswer = (item) => {
    if (item.type === "list") {
      return (
        <div className="space-y-4">
          {item.introduction && (
            <p className="text-gray-800 font-medium">{item.introduction}</p>
          )}
          <BulletList items={item.answer} />
        </div>
      );
    }
    return <p className="text-gray-600 font-medium">{item.answer}</p>;
  };

  const half = Math.ceil(FAQData.items.length / 2);
  const leftColumn = FAQData.items.slice(0, half);
  const rightColumn = FAQData.items.slice(half);

  return (
    <div className="relative mx-auto max-w-full bg-[#FAF9F6] py-24 border-t border-gray-100/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#916a6b] mb-6 tracking-tight">
            {FAQData.heading}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            {FAQData.info}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <Accordion type="single" collapsible className="space-y-2">
            {leftColumn.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="px-6 py-4 text-gray-900 font-bold text-lg hover:no-underline text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  {renderAnswer(item)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Right Column */}
          <Accordion type="single" collapsible className="space-y-2">
            {rightColumn.map((item, index) => (
              <AccordionItem
                key={index + half}
                value={`item-${index + half}`}
                className="border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="px-6 py-4 text-gray-900 font-bold text-lg hover:no-underline text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  {renderAnswer(item)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
