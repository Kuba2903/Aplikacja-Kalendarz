"use client";

import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { useAuth } from "../../lib/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const { user } = useAuth();
  const router = useRouter();
  const auth = getAuth();

  if (user) {
    return null;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState(""); 

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setRegisterError("Hasła muszą być takie same.");
      return false;
    }
    if (password.length < 6) {
      setRegisterError("Hasło musi mieć co najmniej 6 znaków.");
      return false;
    }
    setRegisterError(""); 
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validatePasswords()) return;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Użytkownik zarejestrowany!");

        sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log("E-mail weryfikacyjny wysłany!");

            signOut(auth);

            router.push("/user/verify");
          })
          .catch((error) => {
            setRegisterError(error.message);
            console.dir(error);
          });
      })
      .catch((error) => {
        setRegisterError(error.message);
        console.dir(error);
      });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Rejestracja</h2>
      {registerError && (
        <div style={{ color: "red", marginBottom: "15px", padding: "10px", backgroundColor: "#f8d7da", border: "1px solid #f5c6cb", borderRadius: "5px" }}>
          <strong>Błąd:</strong> {registerError}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>Hasło:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="confirmPassword" style={{ display: "block", marginBottom: "5px" }}>Powtórz Hasło:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Zarejestruj się
        </button>
      </form>
    </div>
  );
}
