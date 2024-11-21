'use client';

import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useAuth } from "../../lib/AuthContext";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Alert } from '@mui/material';

export default function SignInForm() {
  const { user, loading } = useAuth();
  const params = useSearchParams();
  const router = useRouter();
  const returnUrl = params.get("returnUrl") || "/"; // Jeśli nie ma returnUrl, użyj ścieżki głównej

  const [error, setError] = useState(""); // Stan na komunikat o błędzie

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target["email"].value;
    const password = e.target["password"].value;

    try {
      // Ustawienie persistence dla sesji
      await setPersistence(auth, browserSessionPersistence);
      
      // Próba logowania
      await signInWithEmailAndPassword(auth, email, password);
      
      // Przekierowanie na returnUrl lub stronę główną
      router.push(returnUrl);
    } catch (error) {
      // Ustawienie błędu do wyświetlenia w formularzu
      setError("Błąd logowania: " + error.message); // Możesz dostosować komunikat
    }
  };

  if (loading) return <p>Loading...</p>; // Wyświetl ekran ładowania

  return user ? (
    <p>You are already signed in!</p> // Opcjonalnie przekieruj, jeśli użytkownik jest już zalogowany
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
          Sign In
        </h2>
        {error && (
          <Alert severity="error" className="mb-4">
          {error}
        </Alert>
        )}
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
          Sign In
        </button>
      </form>
    </div>
  );
}
