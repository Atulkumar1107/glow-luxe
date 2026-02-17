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
  info: "Everything you need to know about GlowLuxe beauty tools and skincare essentials.",
  items: [
    {
      question: "How do I use the GlowLuxe Facial Roller?",
      answer:
        "Use the roller on clean skin after applying serum or moisturizer. Gently glide upward and outward across the face and neck for 5–10 minutes to improve circulation and reduce puffiness.",
      type: "text",
    },
    {
      question: "What are the benefits of the LED Face Massager?",
      answer: [
        "Stimulates collagen production",
        "Helps reduce fine lines and puffiness",
        "Enhances absorption of skincare products",
        "Improves overall skin texture",
      ],
      type: "list",
      introduction:
        "The GlowLuxe LED Face Massager offers multiple skincare benefits:",
    },
    {
      question: "Are your products suitable for all skin types?",
      answer:
        "Yes. GlowLuxe beauty tools and treatments are designed to be gentle and effective for all skin types, including sensitive skin.",
      type: "text",
    },
    {
      question: "How often should I use these products?",
      answer:
        "For best results, use your facial roller or LED massager 3–5 times per week. Hydro gel patches and sheet masks can be used 2–3 times weekly for enhanced hydration.",
      type: "text",
    },
    {
      question: "When will I see visible results?",
      answer:
        "Most users notice improved hydration and reduced puffiness within 1–2 weeks of consistent use. Long-term benefits improve with regular skincare rituals.",
      type: "text",
    },
    {
      question: "Are GlowLuxe tools safe to use daily?",
      answer: [
        "Non-invasive and skin-friendly design",
        "Ergonomic and gentle application",
        "Dermatologically safe materials",
        "Designed for home use",
      ],
      type: "list",
      introduction:
        "Yes, our tools are designed for safe and regular use:",
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
