"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";

export default function ContactPage() {
  const router = useRouter();
  const { cartItems } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    // If cart is empty, redirect to shop
    if (cartItems.length === 0) {
      router.push("/shopnow");
      return;
    }

    // If user is already logged in, redirect to checkout
    if (user) {
      router.push("/checkout");
    }
  }, [cartItems, router, user]);

  const handleLogin = () => {
    router.push(`/login?returnTo=${encodeURIComponent("/checkout")}`);
  };

  const handleRegister = () => {
    router.push(`/register?returnTo=${encodeURIComponent("/checkout")}`);
  };

  // If user is authenticated, show redirect message
  if (user) {
    return (
      <>
        <Header forceDark={true} />
        <div className="min-h-screen mt-[72px] bg-[#EDF1D6] py-12 flex justify-center items-center">
          <p className="text-lg text-gray-600">
            Redirecting to payment...
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header forceDark={true} />

      <div className="min-h-screen mt-[72px] bg-[#EDF1D6] py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-[#EDF1D6] rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-[#40513B] mb-8">
              Checkout
            </h1>

            {/* Order Summary */}
            <div className="mb-8 p-4 bg-[#EDF1D6] rounded-lg">
              <h2 className="text-lg font-semibold text-black mb-4">
                Order Summary
              </h2>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-2"
                >
                  <div className="flex items-center">
                    <img
                      src={item.productImgs?.[0]?.url || item.images?.[0] || item.mainImage || item.image || ""}
                      alt={item.title || item.name}
                      className="w-12 h-12 object-cover rounded mr-4"
                    />
                    <div>
                      <p className="font-medium text-black">
                        {item.title || item.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="font-medium text-black">
                    $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="font-semibold text-black">
                    Total:
                  </span>
                  <span className="font-semibold text-black">
                    $
                    {cartItems
                      .reduce(
                        (sum, item) =>
                          sum + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Auth Options */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border p-6 rounded-lg">
                <h2 className="text-xl text-black font-semibold mb-4">
                  Returning Customer
                </h2>
                <p className="text-gray-600 mb-4">
                  Already have an account? Sign in for faster checkout.
                </p>
                <button
                  onClick={handleLogin}
                  className="w-full bg-[#609966] text-white py-3 px-6 rounded-lg hover:bg-[#558855] transition-colors"
                >
                  Sign In
                </button>
              </div>

              <div className="border p-6 rounded-lg">
                <h2 className="text-xl text-black font-semibold mb-4">
                  New Customer
                </h2>
                <p className="text-gray-600 mb-4">
                  Create an account for faster checkout and order tracking.
                </p>
                <button
                  onClick={handleRegister}
                  className="w-full bg-[#609966] text-white py-3 px-6 rounded-lg hover:bg-[#558855] transition-colors"
                >
                  Create Account
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
