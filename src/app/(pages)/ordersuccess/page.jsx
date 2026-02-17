"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { CheckCircle } from "lucide-react";

export default function OrderSuccessPage() {
  const router = useRouter();

  return (
    <>
      <Header forceDark={true} />

      <div className="min-h-screen mt-[72px] bg-[#EDF1D6] py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-[#609966]" />
            </div>

            <h1 className="text-2xl font-bold text-[#40513B] mb-4">
              Order Confirmed!
            </h1>

            <p className="text-gray-600 mb-8">
              Thank you for your purchase. Your order has been successfully
              placed and will be processed soon.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => router.push("/shopnow")}
                className="w-full bg-[#609966] text-white py-3 px-6 rounded-lg hover:bg-[#558855] transition-colors"
              >
                Continue Shopping
              </button>

              <button
                onClick={() => router.push("/orders")}
                className="w-full border border-[#609966] text-[#609966] py-3 px-6 rounded-lg hover:bg-[#EDF1D6] transition-colors"
              >
                View Order History
              </button>
            </div>

            {/* Order Tips */}
            <div className="mt-12 text-left">
              <h2 className="text-lg font-semibold mb-4">
                What's Next?
              </h2>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#609966] mr-2">•</span>
                  You will receive an order confirmation email shortly
                </li>
                <li className="flex items-start">
                  <span className="text-[#609966] mr-2">•</span>
                  We will notify you once your order has been shipped
                </li>
                <li className="flex items-start">
                  <span className="text-[#609966] mr-2">•</span>
                  You can track your order status in your account dashboard
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="mt-8 pt-8 border-t">
              <p className="text-gray-600">
                Need help? Contact our support team at{" "}
                <a
                  href="mailto:support@example.com"
                  className="text-[#609966] hover:underline"
                >
                  support@example.com
                </a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
