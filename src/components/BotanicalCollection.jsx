"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { products } from "@/data/productsData";

const BotanicalCollection = () => {
  const { addToCart } = useCart();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);

  // Use the first product from data as the featured one
  const product = products[0];

  // Use the rest of the products as recommended
  const recommendedProducts = products.slice(1, 4);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleViewDetails = (slug) => {
    router.push(`/product/${slug}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <div className="max-w-[1370px] mx-auto px-4 py-8">

        {/* MAIN PRODUCT */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-12 p-8 lg:p-16">
            {/* LEFT IMAGES */}
            <div>
              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <img
                  src={product.productImgs[selectedImage].url}
                  alt={product.title}
                  className="w-full h-[450px] object-contain rounded-xl"
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                {product.productImgs.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-gray-50 rounded-xl p-2 transition-all ${
                      selectedImage === index ? "ring-2 ring-[#916a6b]" : "border border-gray-100"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`${product.title} - ${index}`}
                      className="w-full h-20 object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT DETAILS */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl text-gray-900 font-black mb-6 tracking-tight">
                {product.title}
              </h1>

              <p className="text-3xl text-[#916a6b] font-black mb-8">
                ${product.price}
              </p>

              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                {product.description}
              </p>

              <div className="mb-10">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Key Benefits</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700 font-medium">
                      <span className="w-1.5 h-1.5 bg-[#916a6b] rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-[#916a6b] text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widst hover:bg-[#7a595a] transition-all shadow-xl shadow-rose-900/10 active:scale-[0.98] w-full md:w-auto self-start"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* RECOMMENDED */}
        <div className="mt-24">
          <h2 className="text-3xl font-black text-gray-900 mb-10 tracking-tight uppercase">
            Complete Your Routine
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {recommendedProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group flex flex-col"
              >
                <div className="bg-gray-50 rounded-xl md:rounded-2xl p-2 md:p-4 mb-4 md:mb-6">
                  <img
                    src={item.productImgs[0].url}
                    alt={item.title}
                    className="h-32 md:h-64 w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-2 truncate px-1">
                  {item.title}
                </h3>

                <p className="font-black text-[#916a6b] text-sm md:text-lg mb-4 md:mb-6 px-1">
                  ${item.price}
                </p>

                <button
                  onClick={() => handleViewDetails(item.slug)}
                  className="mt-auto bg-[#FAF9F6] text-[#916a6b] border-2 border-[#916a6b] px-6 py-3 rounded-2xl hover:bg-[#916a6b] hover:text-white transition-all font-black uppercase tracking-widest text-xs"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BotanicalCollection;
