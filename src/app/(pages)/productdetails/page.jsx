"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { useRouter, useParams } from "next/navigation";
import { products } from "@/data/productsData";

export default function ProductDetails() {
  const router = useRouter();
  const params = useParams();

  const productId = Number(params.id);
  const currentProduct = products.find(
    (p) => p.id === productId
  ) || products[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const {
    cartItems,
    addToCart,
    updateQuantity,
    setIsCartOpen,
  } = useCart();

  const MAX_QUANTITY = 99;

  useEffect(() => {
    const cartItem = cartItems.find(
      (item) => item.id === currentProduct.id
    );

    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItems, currentProduct.id]);

  const handleQuantityChange = (value) => {
    const valid = Math.max(1, Math.min(value, MAX_QUANTITY));
    setQuantity(valid);

    const existing = cartItems.find(
      (item) => item.id === currentProduct.id
    );

    if (existing) {
      updateQuantity(currentProduct.id, valid);
    }
  };

  const handleAddToCart = () => {
    const existing = cartItems.find(
      (item) => item.id === currentProduct.id
    );

    if (existing) {
      updateQuantity(currentProduct.id, quantity);
    } else {
      addToCart({ ...currentProduct, quantity });
    }

    // 🔥 This opens the global drawer from Header
    setIsCartOpen(true);
  };

  return (
    <>
      <Header forceDark={true} />

      <div className="min-h-screen mt-[72px] bg-[#EDF1D6]">
        <div className="max-w-[1370px] mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8 p-8 bg-white rounded-lg shadow-md">

            {/* Product Gallery */}
            <div>
              <img
                src={currentProduct.productImgs[selectedImage].url}
                alt={currentProduct.title}
                className="w-full h-[400px] object-cover rounded-lg"
              />

              <div className="grid grid-cols-4 gap-2 mt-4">
                {currentProduct.productImgs.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-md overflow-hidden ${
                      selectedImage === index
                        ? "ring-2 ring-[#609966]"
                        : ""
                    }`}
                  >
                    <img
                      src={img.url}
                      alt="thumbnail"
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-[#40513B] mb-4">
                {currentProduct.title}
              </h1>

              <p className="text-2xl text-[#609966] mb-6 font-semibold">
                ${currentProduct.price}
              </p>

              <p className="text-gray-600 mb-4">
                {currentProduct.description}
              </p>

              <ul className="space-y-2 mb-6 text-gray-700">
                {currentProduct.features.map((feature, i) => (
                  <li key={i}>• {feature}</li>
                ))}
              </ul>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-700">Quantity:</span>
                <input
                  type="number"
                  min="1"
                  max={MAX_QUANTITY}
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(Number(e.target.value))
                  }
                  className="w-20 border rounded px-2 py-1 text-center"
                />
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#609966] hover:bg-[#558855] text-white py-3 rounded-lg transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
