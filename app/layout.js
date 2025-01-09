"use client";

import React from "react";
import { FaHome, FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { AuthProvider, useAuth } from "./lib/AuthContext";
import Link from 'next/link';

const Navigation = () => {
  const { user } = useAuth();
  
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1>MyApp</h1>
      <nav>
        {user ? (
          <div style={{ color: "white" }}>
            Hello, {user.displayName || user.email}
          </div>
        ) : (
          <>
            <Link href="/signIn" style={{ color: "white", marginRight: "15px" }}>
              <FaSignInAlt /> Sign In
            </Link>
            <Link href="/register" style={{ color: "white" }}>
              <FaUser /> Register
            </Link>
          </>
        )}
      </nav>
    </div>
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

            {/* Main Content with Sidebar */}
            <div style={{ display: "flex", flex: 1 }}>
              {/* Sidebar */}
              <aside style={{ width: "200px", backgroundColor: "#F8F9FA", padding: "10px" }}>
                <nav>
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li>
                      <a href="/home">
                        <FaHome /> Home
                      </a>
                    </li>
                    <li>
                    <Link href="/user/profile" >
                      <FaUser /> Profile
                    </Link>
                    </li>
                    <li>
                      <a href="/logOut">
                        <FaSignOutAlt /> Sign Out
                      </a>
                    </li>
                  </ul>
                </nav>
              </aside>

              {/* Main Content */}
              <main style={{ flex: 1, padding: "20px" }}>{children}</main>
            </div>

            {/* Footer */}
            <footer style={{ backgroundColor: "#007BFF", padding: "10px", color: "white", textAlign: "center" }}>
              <p>© 2025 MyApp. All rights reserved.</p>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;
