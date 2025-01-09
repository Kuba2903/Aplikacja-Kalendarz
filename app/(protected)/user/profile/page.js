"use client";

import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../../../lib/AuthContext";
import { FaUser } from "react-icons/fa";

export default function ProfileForm() {
  const { user, loading } = useAuth(); // Pobieramy użytkownika i stan ładowania z kontekstu
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [error, setError] = useState(""); // Stan obsługujący błędy

  // Jeśli dane użytkownika są wczytywane, możemy wyświetlić np. loader
  if (loading) {
    return <p>Ładowanie...</p>;
  }

  // Jeśli użytkownik nie jest zalogowany, zwracamy null
  if (!user) {
    return <p>Nie jesteś zalogowany.</p>;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    updateProfile(user, {
      displayName: displayName.trim(),
      photoURL: photoURL.trim(),
    })
      .then(() => {
        console.log("Profil zaktualizowany!");
        setError(""); // Resetujemy stan błędu po pomyślnej aktualizacji
      })
      .catch((error) => {
        setError(error.message); // Ustawiamy stan błędu, jeśli wystąpi problem
      });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Twój Profil</h2>
      
      {/* Dodaj podgląd zdjęcia profilowego */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {photoURL ? (
          <img 
            src={photoURL} 
            alt="Profile Preview" 
            style={{ 
              width: "100px", 
              height: "100px", 
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #007BFF"
            }} 
          />
        ) : (
          <div style={{ 
            width: "100px", 
            height: "100px", 
            borderRadius: "50%",
            backgroundColor: "#e9ecef",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto"
          }}>
            <FaUser size={40} color="#6c757d" />
          </div>
        )}
      </div>

      {error && (
        <div style={{ color: "red", marginBottom: "15px", padding: "10px", backgroundColor: "#f8d7da", border: "1px solid #f5c6cb", borderRadius: "5px" }}>
          <strong>Błąd:</strong> {error}
        </div>
      )}
      
      <form onSubmit={onSubmit}>
        {/* Pole nazwy wyświetlanej */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="displayName" style={{ display: "block", marginBottom: "5px" }}>Nazwa wyświetlana:</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        {/* Pole e-mail (tylko do odczytu) */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>Adres e-mail:</label>
          <input
            type="email"
            id="email"
            value={user.email}
            readOnly
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", backgroundColor: "#e9ecef" }}
          />
        </div>

        {/* Pole adresu zdjęcia profilowego */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="photoURL" style={{ display: "block", marginBottom: "5px" }}>Adres zdjęcia profilowego:</label>
          <input
            type="url"
            id="photoURL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        {/* Przycisk zapisz */}
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
          Zapisz zmiany
        </button>
      </form>
    </div>
  );
}
