import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Glow Luxe",
  description: "We are dedicated to crafting premium, botanical skincare solutions that honor the power of nature. Our goal is to provide your skin with the purest organic sustainable care, bringing out your natural radiance with every ritual.",
};

// ✅ Static frontend data
const headerData = {
  navbars: [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Products",
      link: "/products",
    },
    {
      title: "About Us",
      link: "/about",
    },
    {
      title: "Contact",
      link: "/contact",
    },
  ],
};

const footerData = {
  pages: [
    { title: "Privacy Policy", link: "/privacy" },
    { title: "Terms & Conditions", link: "/terms" },
  ],
  contactInfo: {
    phone: "+91 9876543210",
    email: "info@shriharipooja.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer footerData={footerData} />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
