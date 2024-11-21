'use client';

import { useState } from "react";
import { AuthProvider } from './lib/AuthContext';
import Link from 'next/link';
import { FaUserPlus, FaSignInAlt, FaSignOutAlt } from "react-icons/fa"; // Ikona wylogowania
import LogoutButton from './(public)/logOut/page';

const menuItems = [
  { id: 1, label: "Register", url: "register", icon: <FaUserPlus /> },
  { id: 2, label: "Sign In", url: "signIn", icon: <FaSignInAlt /> },
];

export default function RootLayout({ children }) {
  // Stan do śledzenia aktywnego URL
  const [activeUrl, setActiveUrl] = useState(menuItems[0].url);

  return (
    <AuthProvider>
      <html lang="en">
        <body className="antialiased" style={{ display: "flex", height: "100vh" }}>
          {/* Sidebar */}
          <div
            style={{
              width: "250px",
              backgroundColor: "#2d2d2d",
              color: "#fff",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <h2 style={{ textAlign: "center" }}>My App</h2>
            <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    textDecoration: "none",
                    color: activeUrl === item.url ? "#4caf50" : "#fff",
                    fontWeight: activeUrl === item.url ? "bold" : "normal",
                  }}
                  onClick={() => setActiveUrl(item.url)} // Zaktualizowanie aktywnego URL
                >
                  {item.icon} {/* Ikona */}
                  {item.label}
                </Link>
              ))}

              {/* Dodanie przycisku wylogowania */}
              <div>
                <LogoutButton />
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, padding: "1rem" }}>
            {children}
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}