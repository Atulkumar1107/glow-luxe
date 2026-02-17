"use client";

import React, { useState, useEffect } from "react";
import { Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { products } from "@/data/productsData";

export default function ShopSection() {
  const router = useRouter();
  const { cartItems, addToCart, updateQuantity, setIsCartOpen } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);

  const mainProduct = products[0];
  const otherProducts = products.slice(1);

  const [mainQuantity, setMainQuantity] = useState(1);
  const MAX_QUANTITY = 99;

  // Sync main product quantity with cart
  useEffect(() => {
    const cartItem = cartItems.find((item) => item.id === mainProduct.id);
    if (cartItem) {
      setMainQuantity(cartItem.quantity);
    }
  }, [cartItems, mainProduct.id]);

  const handleMainQuantityChange = (newQuantity) => {
    const validQuantity = Math.max(1, Math.min(newQuantity, MAX_QUANTITY));
    setMainQuantity(validQuantity);
  };

  const handleMainAddToCart = () => {
    const existingItem = cartItems.find((item) => item.id === mainProduct.id);

    if (existingItem) {
      updateQuantity(mainProduct.id, mainQuantity);
    } else {
      addToCart(mainProduct, mainQuantity);
    }

    setIsCartOpen(true);
  };

  /* =========================
     PRODUCT CARD COMPONENT
  ========================== */

  const ProductCard = ({ product }) => {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all group">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/3 bg-gray-50 rounded-2xl p-4 overflow-hidden">
            <img
              src={product.productImgs[0].url}
              alt={product.title}
              className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="md:w-2/3 flex flex-col justify-center">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                {product.title}
              </h2>
              <span className="text-2xl font-black text-[#916a6b]">
                ${product.price}
              </span>
            </div>

            <p className="text-gray-600 mb-6 line-clamp-2">{product.description}</p>

            <ul className="space-y-2 mb-8">
              {product.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-700 font-medium">
                  <span className="w-1.5 h-1.5 bg-[#916a6b] rounded-full mr-3"></span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <Link
                href={`/product/${product.slug}`}
                className="flex-1 bg-[#FAF9F6] text-[#916a6b] border-2 border-[#916a6b] px-6 py-3 rounded-2xl hover:bg-[#916a6b] hover:text-white transition-all font-black uppercase tracking-widest text-xs text-center"
              >
                View Details
              </Link>

              <button
                onClick={() => {
                    addToCart(product, 1);
                    setIsCartOpen(true);
                }}
                className="bg-[#916a6b] text-white p-3.5 rounded-2xl hover:bg-[#7a595a] transition-all shadow-lg shadow-rose-900/10 active:scale-[0.98]"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header forceDark={true} />

      <div className="min-h-screen mt-[100px] bg-[#FAF9F6] pb-24">
        {/* HERO SECTION - FEATUREED PRODUCT */}
        <div className="bg-white border-b border-gray-100 mb-16">
          <div className="max-w-[1370px] mx-auto px-4 py-12 lg:py-20">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Product Visuals */}
              <div>
                <div className="bg-gray-50 rounded-[2.5rem] p-8 mb-6 relative group overflow-hidden">
                  <div className="absolute top-6 left-6 z-10">
                    <span className="bg-[#916a6b] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Featured</span>
                  </div>
                  <img
                    src={mainProduct.productImgs[selectedImage].url}
                    alt={mainProduct.title}
                    className="w-full h-[450px] object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {mainProduct.productImgs.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`bg-gray-50 rounded-2xl p-2 transition-all ${
                        selectedImage === index ? "ring-2 ring-[#916a6b]" : "border border-gray-100"
                      }`}
                    >
                      <img
                        src={img.url}
                        alt="thumb"
                        className="h-16 w-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
                    {mainProduct.title}
                  </h1>
                  <p className="text-3xl font-black text-[#916a6b] mb-6">${mainProduct.price}</p>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-xl">{mainProduct.description}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Premium Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mainProduct.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-700 font-bold text-sm">
                        <div className="w-2 h-2 bg-[#916a6b] rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center bg-[#FAF9F6] rounded-2xl border border-gray-200 p-1 w-full sm:w-auto">
                    <button
                      onClick={() => handleMainQuantityChange(mainQuantity - 1)}
                      className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-[#916a6b] transition-colors"
                      disabled={mainQuantity <= 1}
                    >
                      <Minus size={18} />
                    </button>
                    <input
                      type="number"
                      value={mainQuantity}
                      onChange={(e) => handleMainQuantityChange(Number(e.target.value))}
                      className="w-12 text-center bg-transparent font-black text-gray-900 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      onClick={() => handleMainQuantityChange(mainQuantity + 1)}
                      className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-[#916a6b] transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <button
                    onClick={handleMainAddToCart}
                    className="flex-1 bg-[#916a6b] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#7a595a] transition-all shadow-xl shadow-rose-900/10 active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="max-w-[1370px] mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
              Complete Your Routine
            </h2>
            <div className="h-px bg-gray-200 flex-1 mx-8 hidden sm:block"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            {otherProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
