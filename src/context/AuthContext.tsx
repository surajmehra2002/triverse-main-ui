// 'use client';

// import React, { createContext, useContext, useEffect, useState } from "react";
// import { getCurrentUser, logoutUser } from "@/api/services/authService";

// // 1️⃣ Define user and context types
// interface User {
//   name: string;
//   role: string;
// }

// interface AuthContextType {
//   user: User | null;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
//   logout: () => Promise<void>;
// }

// // 2️⃣ Create typed context
// const AuthContext = createContext<AuthContextType | null>(null);

// // 3️⃣ AuthProvider implementation
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);

//   // 🔁 Uncomment for real API integration
//   /*
//   useEffect(() => {
//     getCurrentUser()
//       .then(data => setUser(data))
//       .catch(() => setUser(null));
//   }, []);
//   */

//   // ✅ Mock user for development
//   useEffect(() => {
//     setUser({ name: "John Doe", role: "super-admin" });
//   }, []);

//   const logout = async () => {
//     await logoutUser();
//     setUser(null);
//     window.location.href = "/"; // Or use router.push("/") if needed
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // 4️⃣ Safe custom hook
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
