import React from "react";
import { Mail, Phone, MapPin, Heart } from "lucide-react";
import { products } from "@/data/productsData";

const Footer = () => {
  const footerData = {
    copyRight: "© 2026 Glow Luxe Skincare. All rights reserved.",
    developedBy: "Crafted by",
    companyName: "Atul Kumar (Frontend Developer)",
    Footer: [
      {
        id: 1,
        heading: "Quick Links",
        type: "links",
        links: [
          { title: "Shop", url: "/shopnow" },
          { title: "About", url: "/aboutus" },
          { title: "Contact", url: "/contact" },
          { title: "Shipping Policy", url: "/shipping_policy" },
          { title: "Return Policy", url: "/return_policy" },
          { title: "Terms & Conditions", url: "/terms_&_conditions" },
        ],
      },
      {
        id: 2,
        heading: "Products",
        type: "products",
        products: products.slice(0, 5).map(p => ({
            title: p.title,
            slug: `/product/${p.slug}`
        })),
      },
      {
        id: 3,
        heading: "Contact Info",
        type: "contact",
        contactInfo: [
          { icon: "location", info: "789 Botanical Blvd, California, USA" },
          { icon: "phone", info: "+1 (800) BOTANIC" },
          { icon: "mail", info: "hello@yglowluxeskincare.com" },
        ],
      },
    ],
  };

  return (
    <footer className="w-full bg-[#916a6b] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          {footerData.Footer.map((section) => (
            <div key={section.id}>
              <h3 className="text-xl text-white font-black mb-8 uppercase tracking-widest">
                {section.heading}
              </h3>

              {/* Links */}
              {section.type === "links" && (
                <ul className="space-y-4">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <a href={link.url} className="text-white/80 hover:text-white transition-colors font-medium">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {/* Products */}
              {section.type === "products" && (
                <ul className="space-y-4">
                  {section.products.map((product, index) => (
                    <li key={index}>
                      <a
                        href={product.slug}
                        className="text-white/80 hover:text-white transition-colors font-medium"
                      >
                        {product.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {/* Contact */}
              {section.type === "contact" && (
                <div className="space-y-5">
                  {section.contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      {item.icon === "location" && (
                        <MapPin className="w-5 h-5 text-white/60 shrink-0" />
                      )}
                      {item.icon === "phone" && (
                        <Phone className="w-5 h-5 text-white/60 shrink-0" />
                      )}
                      {item.icon === "mail" && (
                        <Mail className="w-5 h-5 text-white/60 shrink-0" />
                      )}
                      <p className="text-white/80 font-medium">{item.info}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-white/60">
  
  <p>{footerData.copyRight}</p>

  <div className="flex items-center gap-2">
    <span>{footerData.developedBy}</span>

    <Heart 
      className="w-4 h-4 shrink-0" 
      color="red"
      fill="red"
    />

    <a
      href="https://www.linkedin.com/in/atulkumar1107"
      className="text-white hover:underline transition-all"
      target="_blank"
      rel="noopener noreferrer"
    >
      {footerData.companyName}
    </a>
  </div>

</div>

      </div>
    </footer>
  );
};

export default Footer;
