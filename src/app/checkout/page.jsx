"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const [step, setStep] = useState("address");
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const [addressData, setAddressData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  // Pre-fill email if user is logged in
  useEffect(() => {
    if (user) {
      setAddressData((prev) => ({
        ...prev,
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || ""
      }));
    }
  }, [user]);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
    ];

    requiredFields.forEach((field) => {
      if (!addressData[field]?.trim()) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setStep("review");
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    );
  };

  const calculateShipping = () => 40.0;

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const handleProceedToPayment = () => {
    const orderData = {
      orderNumber: `ORD-${Date.now()}`,
      orderDate: new Date().toISOString().split('T')[0],
      status: "Processing",
      items: cartItems.map(item => ({
        name: item.title || item.name || "Product",
        quantity: item.quantity,
        price: item.price || 0,
        image: item.productImgs?.[0]?.url || item.images?.[0] || item.image || ""
      })),
      shippingAddress: addressData,
      subtotal: calculateSubtotal(),
      shipping: calculateShipping(),
      totalAmount: calculateTotal(),
    };

    addOrder(orderData);
    clearCart();
    router.push("/orders/active");
  };

  if (cartItems.length === 0) {
    return (
        <ProtectedRoute>
            <Header forceDark={true} />
            <div className="min-h-screen mt-[72px] bg-[#FAF9F6] py-12 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#40513B] mb-4">Your cart is empty</h2>
                    <button 
                        onClick={() => router.push('/')}
                        className="bg-[#916a6b] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#7a595a] transition-all shadow-xl shadow-rose-900/10"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <Header forceDark={true} />

      <div className="min-h-screen mt-[100px] bg-[#FAF9F6] py-16">
        <div className="max-w-6xl mx-auto px-4">

          {/* Progress */}
          <div className="mb-12 flex justify-center items-center space-x-12">
            <div className={`flex items-center gap-3 font-black uppercase tracking-widest text-sm transition-colors ${step === 'address' ? 'text-[#916a6b]' : 'text-gray-300'}`}>
              <span className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${step === 'address' ? 'border-[#916a6b]' : 'border-gray-300'}`}>1</span>
              Address
            </div>
            <div className="w-12 h-px bg-gray-200" />
            <div className={`flex items-center gap-3 font-black uppercase tracking-widest text-sm transition-colors ${step === 'review' ? 'text-[#916a6b]' : 'text-gray-300'}`}>
              <span className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${step === 'review' ? 'border-[#916a6b]' : 'border-gray-300'}`}>2</span>
              Review
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {/* LEFT SIDE */}
            <div className="md:col-span-2">

              {step === "address" ? (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-12">
                  <h2 className="text-3xl font-black mb-8 text-gray-900 tracking-tight uppercase">
                    Shipping Address
                  </h2>

                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
                            <input
                            type="text"
                            placeholder="Enter your first name"
                            value={addressData.firstName}
                            onChange={(e) =>
                                setAddressData({ ...addressData, firstName: e.target.value })
                            }
                             className={`w-full bg-gray-50/50 border border-gray-100 px-5 py-3 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#916a6b]/20 focus:border-[#916a6b] outline-none transition-all ${errors.firstName ? 'border-red-500 bg-red-50/30' : ''}`}
                            />
                            {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Last Name <span className="text-red-500">*</span></label>
                            <input
                            type="text"
                            placeholder="Enter your last name"
                            value={addressData.lastName}
                            onChange={(e) =>
                                setAddressData({ ...addressData, lastName: e.target.value })
                            }
                             className={`w-full bg-gray-50/50 border border-gray-100 px-5 py-3 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#916a6b]/20 focus:border-[#916a6b] outline-none transition-all ${errors.lastName ? 'border-red-500 bg-red-50/30' : ''}`}
                            />
                            {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                        <input
                        type="email"
                        placeholder="example@email.com"
                        value={addressData.email}
                        onChange={(e) =>
                            setAddressData({ ...addressData, email: e.target.value })
                        }
                         className={`w-full bg-gray-50/50 border border-gray-100 px-5 py-3 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#916a6b]/20 focus:border-[#916a6b] outline-none transition-all ${errors.email ? 'border-red-500 bg-red-50/30' : ''}`}
                        />
                         {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                         )}
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                        <input
                        type="tel"
                        placeholder="Format: 123-456-7890"
                        value={addressData.phone}
                        onChange={(e) =>
                            setAddressData({ ...addressData, phone: e.target.value })
                        }
                         className={`w-full bg-gray-50/50 border border-gray-100 px-5 py-3 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#916a6b]/20 focus:border-[#916a6b] outline-none transition-all ${errors.phone ? 'border-red-500 bg-red-50/30' : ''}`}
                        />
                         {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                         )}
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Street Address <span className="text-red-500">*</span></label>
                        <input
                        type="text"
                        placeholder="House number and street name"
                        value={addressData.address}
                        onChange={(e) =>
                            setAddressData({ ...addressData, address: e.target.value })
                        }
                         className={`w-full bg-gray-50/50 border border-gray-100 px-5 py-3 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#916a6b]/20 focus:border-[#916a6b] outline-none transition-all ${errors.address ? 'border-red-500 bg-red-50/30' : ''}`}
                        />
                         {errors.address && (
                            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                         )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">City <span className="text-red-500">*</span></label>
                            <input
                            type="text"
                            placeholder="City"
                            value={addressData.city}
                            onChange={(e) =>
                                setAddressData({ ...addressData, city: e.target.value })
                            }
                             className={`w-full bg-gray-50/50 border border-gray-100 px-5 py-3 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#916a6b]/20 focus:border-[#916a6b] outline-none transition-all ${errors.city ? 'border-red-500 bg-red-50/30' : ''}`}
                            />
                             {errors.city && (
                                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                             )}
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">State <span className="text-red-500">*</span></label>
                            <input
                            type="text"
                            placeholder="State/Province"
                            value={addressData.state}
                            onChange={(e) =>
                                setAddressData({ ...addressData, state: e.target.value })
                            }
                             className={`w-full bg-gray-50/50 border border-gray-100 px-5 py-3 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#916a6b]/20 focus:border-[#916a6b] outline-none transition-all ${errors.state ? 'border-red-500 bg-red-50/30' : ''}`}
                            />
                             {errors.state && (
                                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                             )}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Zip Code <span className="text-red-500">*</span></label>
                         <input
                            type="text"
                            placeholder="e.g. 10001"
                            value={addressData.zipCode}
                            onChange={(e) =>
                                setAddressData({ ...addressData, zipCode: e.target.value })
                            }
                             className={`w-full bg-gray-50/50 border border-gray-100 px-5 py-3 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#916a6b]/20 focus:border-[#916a6b] outline-none transition-all ${errors.zipCode ? 'border-red-500 bg-red-50/30' : ''}`}
                            />
                             {errors.zipCode && (
                                <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                             )}
                    </div>

                     <button
                       type="submit"
                       className="w-full bg-[#916a6b] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#7a595a] transition-all shadow-xl shadow-rose-900/10 active:scale-[0.98] mt-4"
                     >
                       Continue to Review
                     </button>
                  </form>
                </div>
              ) : (
                 <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-12">
                   <h2 className="text-3xl font-black mb-8 text-gray-900 tracking-tight uppercase">
                     Review Order
                   </h2>
                  <div className="mb-6 border-b pb-4">
                     <h3 className="font-semibold text-[#40513B] mb-2">Shipping Address:</h3>
                     <p className="text-gray-600">{addressData.firstName} {addressData.lastName}</p>
                     <p className="text-gray-600">{addressData.address}</p>
                     <p className="text-gray-600">{addressData.city}, {addressData.state} {addressData.zipCode}</p>
                     <p className="text-gray-600">{addressData.email}</p>
                     <p className="text-gray-600">{addressData.phone}</p>
                      <button 
                         onClick={() => setStep('address')}
                         className="text-[#916a6b] font-bold text-sm hover:underline mt-4 uppercase tracking-wider"
                      >
                         Edit Address
                      </button>
                  </div>

                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between mb-4 items-center">
                        <div className="flex items-center gap-4">
                             <img 
                               src={item.productImgs?.[0]?.url || item.images?.[0] || item.image || ""} 
                               alt={item.title || item.name} 
                               className="w-16 h-16 object-contain rounded-xl bg-gray-50 p-1 border border-gray-100" 
                             />
                            <div>
                                <span className="text-black block font-medium">
                                    {item.title || item.name}
                                </span>
                                <span className="text-gray-500 text-sm">
                                    Qty: {item.quantity}
                                </span>
                            </div>
                        </div>
                       <span className="text-gray-900 font-bold">
                         ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                       </span>
                    </div>
                  ))}

                   <button
                     onClick={handleProceedToPayment}
                     className="w-full bg-[#916a6b] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#7a595a] transition-all shadow-xl shadow-rose-900/10 active:scale-[0.98] mt-8"
                   >
                     Place Order
                   </button>
                </div>
              )}
            </div>

            {/* RIGHT SIDE */}
            <div>
               <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sticky top-24">
                 <h3 className="text-xl font-black mb-6 text-gray-900 tracking-tight uppercase">
                   Order Summary
                 </h3>

                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="truncate pr-4 text-gray-700">
                        {item.title || item.name} (x{item.quantity})
                      </span>
                      <span className="text-gray-900">
                        ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-4 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>${calculateShipping().toFixed(2)}</span>
                  </div>
                   <div className="flex justify-between font-black text-2xl border-t border-gray-100 pt-4 text-[#916a6b]">
                     <span>Total</span>
                     <span>${calculateTotal().toFixed(2)}</span>
                   </div>
                </div>

                <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  Flat rate shipping charge of $40.00 applies.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
