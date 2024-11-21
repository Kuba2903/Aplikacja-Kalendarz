'use client';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useAuth } from "../../lib/AuthContext";
import { useSearchParams, useRouter } from "next/navigation";

export default function Register() {
  const { user, loading } = useAuth();
  const params = useSearchParams();
  const router = useRouter();
  const returnUrl = params.get("returnUrl") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target["email"].value;
    const password = e.target["password"].value;
    const passwordConfirm = e.target["passwordConfirm"].value;

    if (password !== passwordConfirm) {
      console.error("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push(returnUrl);
    } catch (error) {
      console.error("Error signing up:", error.code, error.message);
    }
  };

  if (loading) return <p>Loading...</p>; // Show a loading state

  return user ? (
    <p>You are already registered!</p> // Optionally, redirect if already logged in
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          backgroundColor: "#ffffff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#333" }}>
          Register
        </h2>
        <label style={{ fontWeight: "bold", color: "#555" }}>Email</label>
        <input
          type="email"
          id="email"
          required
          style={{
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "1rem",
          }}
        />
        <label style={{ fontWeight: "bold", color: "#555" }}>Password</label>
        <input
          type="password"
          id="password"
          required
          style={{
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "1rem",
          }}
        />
        <label style={{ fontWeight: "bold", color: "#555" }}>Confirm Password</label>
        <input
          type="password"
          id="passwordConfirm"
          required
          style={{
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "1rem",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.75rem",
            backgroundColor: "#4caf50",
            color: "#ffffff",
            border: "none",
            borderRadius: "4px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}
