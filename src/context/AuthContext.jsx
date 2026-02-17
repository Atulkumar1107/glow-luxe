"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔹 Load logged in user
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("mockCurrentUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }
  }, []);

  // 🔥 REGISTER
  const register = async ({
    username,
    email,
    password,
    firstName,
    lastName,
  }) => {
    try {
      const users = JSON.parse(localStorage.getItem("mockUsers")) || [];

      const userExists = users.find((u) => u.email === email);

      if (userExists) {
        alert("User already exists with this email");
        return;
      }

      const newUser = {
        id: Date.now(),
        username,
        email,
        password, // ⚠️ Mock only
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
      };

      const updatedUsers = [...users, newUser];

      localStorage.setItem("mockUsers", JSON.stringify(updatedUsers));
      localStorage.setItem("mockCurrentUser", JSON.stringify(newUser));

      setUser(newUser);
      router.push("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  // 🔥 LOGIN
  const login = async ({ email, password }) => {
    try {
      const users = JSON.parse(localStorage.getItem("mockUsers")) || [];

      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        alert("Invalid email or password");
        return;
      }

      localStorage.setItem(
        "mockCurrentUser",
        JSON.stringify(foundUser)
      );

      setUser(foundUser);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // 🔥 LOGOUT
  const logout = () => {
    localStorage.removeItem("mockCurrentUser");
    setUser(null);
    router.push("/");
  };

  // 🔥 UPDATE PROFILE
  const updateProfile = async (updatedData) => {
    try {
      const users = JSON.parse(localStorage.getItem("mockUsers")) || [];

      const updatedUsers = users.map((u) =>
        u.id === user.id ? { ...u, ...updatedData } : u
      );

      const updatedUser = updatedUsers.find((u) => u.id === user.id);

      localStorage.setItem("mockUsers", JSON.stringify(updatedUsers));
      localStorage.setItem(
        "mockCurrentUser",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  // 🔥 UPDATE PASSWORD
  const updatePassword = async (currentPassword, newPassword) => {
    try {
      if (user.password !== currentPassword) {
        throw new Error("Current password is incorrect");
      }

      const users = JSON.parse(localStorage.getItem("mockUsers")) || [];

      const updatedUsers = users.map((u) =>
        u.id === user.id ? { ...u, password: newPassword } : u
      );

      const updatedUser = updatedUsers.find((u) => u.id === user.id);

      localStorage.setItem("mockUsers", JSON.stringify(updatedUsers));
      localStorage.setItem(
        "mockCurrentUser",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);
    } catch (error) {
      throw error;
    }
  };

  // 🔥 ADD ORDER
  const addOrder = (order) => {
    try {
      if (!user) return;

      const orders = JSON.parse(localStorage.getItem("mockOrders")) || [];
      const newOrder = { ...order, userId: user.id, id: Date.now() };
      const updatedOrders = [newOrder, ...orders];

      localStorage.setItem("mockOrders", JSON.stringify(updatedOrders));
      return newOrder;
    } catch (error) {
       console.error("Failed to add order:", error);
    }
  };

  // 🔥 GET ORDERS
  const getOrders = () => {
    try {
      if (!user) return [];
      let orders = JSON.parse(localStorage.getItem("mockOrders")) || [];
      
      // Filter for current user's orders
      let userOrders = orders.filter(order => order.userId === user.id);

      // Check if any order contains legacy "Yegg" or "Trailer" keywords
      const hasLegacyData = userOrders.some(order => 
        order.items?.some(item => 
          (item.name || item.title || "").toLowerCase().includes("yegg") || 
          (item.name || item.title || "").toLowerCase().includes("trailer")
        )
      );

      // 🌸 MOCK SYNC: If user has no orders or has legacy data, seed with fresh skincare orders
      if ((userOrders.length === 0 || hasLegacyData) && typeof window !== "undefined") {
        const { products } = require("@/data/productsData");
        const seedOrders = [
          {
            id: Date.now() - 86400000,
            userId: user.id,
            status: "Shipped",
            date: new Date(Date.now() - 86400000).toLocaleDateString(),
            items: [
              { ...products[0], quantity: 1 },
              { ...products[1], quantity: 2 }
            ],
            total: products[0].price + (products[1].price * 2),
            shippingAddress: "789 Botanical Blvd, CA"
          },
          {
            id: Date.now() - 172800000,
            userId: user.id,
            status: "Processing",
            date: new Date(Date.now() - 172800000).toLocaleDateString(),
            items: [
              { ...products[2], quantity: 1 }
            ],
            total: products[2].price,
            shippingAddress: "789 Botanical Blvd, CA"
          }
        ];
        
        // Remove old legacy orders for this user and add fresh ones
        const otherUsersOrders = orders.filter(order => order.userId !== user.id);
        const updatedAllOrders = [...seedOrders, ...otherUsersOrders];
        localStorage.setItem("mockOrders", JSON.stringify(updatedAllOrders));
        return seedOrders;
      }

      return userOrders;
    } catch (error) {
      console.error("Failed to get orders:", error);
      return [];
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        updateProfile,
        updatePassword,
        addOrder,
        getOrders,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
