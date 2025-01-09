"use client";

import React from "react";
import { FaHome, FaUser, FaSignInAlt, FaSignOutAlt, FaCalendarAlt } from "react-icons/fa";
import { AuthProvider, useAuth } from "./lib/AuthContext";
import Link from 'next/link';

const Navigation = () => {
  const { user } = useAuth();
  
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1>Calendar App</h1>
      <nav>
        {user ? (
          <div style={{ color: "white", display: "flex", alignItems: "center", gap: "10px" }}>
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="Zdjęcie profilowe" 
                style={{ 
                  width: "32px", 
                  height: "32px", 
                  borderRadius: "50%",
                  objectFit: "cover"
                }} 
              />
            ) : (
              <FaUser size={24} />
            )}
            Witaj, {user.displayName || user.email}
          </div>
        ) : (
          <>
            <Link href="/signIn" style={{ color: "white", marginRight: "15px" }}>
              <FaSignInAlt /> Zaloguj się
            </Link>
            <Link href="/register" style={{ color: "white" }}>
              <FaUser /> Zarejestruj się
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside style={{ width: "200px", backgroundColor: "#F8F9FA", padding: "10px" }}>
      <nav>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li style={{ marginBottom: "15px" }}>
            <Link 
              href="/home" 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "10px",
                textDecoration: "none",
                color: "inherit"
              }}
            >
              <FaHome /> Strona główna
            </Link>
          </li>
          
          {user && (
            <>
              <li style={{ marginBottom: "15px" }}>
                <Link 
                  href="/calendar" 
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "10px",
                    textDecoration: "none",
                    color: "inherit"
                  }}
                >
                  <FaCalendarAlt /> Kalendarz
                </Link>
              </li>
              <li style={{ marginBottom: "15px" }}>
                <Link 
                  href="/user/profile" 
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "10px",
                    textDecoration: "none",
                    color: "inherit"
                  }}
                >
                  <FaUser /> Profil
                </Link>
              </li>
              <li>
                <Link 
                  href="/logOut" 
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "10px",
                    textDecoration: "none",
                    color: "inherit"
                  }}
                >
                  <FaSignOutAlt /> Wyloguj się
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>MyApp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        <AuthProvider>
          <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
            <header style={{ backgroundColor: "#007BFF", padding: "10px", color: "white" }}>
              <Navigation />
            </header>

            <div style={{ display: "flex", flex: 1 }}>
              <Sidebar />
              <main style={{ flex: 1, padding: "20px" }}>{children}</main>
            </div>

            <footer style={{ backgroundColor: "#007BFF", padding: "10px", color: "white", textAlign: "center" }}>
              <p>© 2025 Calendar App. Wszelkie prawa zastrzeżone.</p>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;
