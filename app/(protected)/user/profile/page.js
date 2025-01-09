"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useAuth } from "../../../lib/AuthContext";
import { FaUser } from "react-icons/fa";

export default function ProfileForm() {
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      street: "",
      city: "",
      zipCode: "",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const snapshot = await getDoc(doc(db, "users", user.uid));
          if (snapshot.exists()) {
            const address = snapshot.data().address;
            
            setValue("displayName", user.displayName || "");
            setValue("photoURL", user.photoURL || "");
            setValue("email", user.email || "");
            setValue("street", address?.street || "");
            setValue("city", address?.city || "");
            setValue("zipCode", address?.zipCode || "");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Błąd podczas pobierania danych użytkownika");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateProfile(user, {
        displayName: data.displayName.trim(),
        photoURL: data.photoURL.trim(),
      });

      await setDoc(doc(db, "users", user.uid), {
        address: {
          street: data.street.trim(),
          city: data.city.trim(),
          zipCode: data.zipCode.trim(),
        },
        email: user.email,
        updatedAt: new Date().toISOString(),
      }, { merge: true });

      setError("");
      console.log("Profil zaktualizowany!");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading || isLoading) return <p>Ładowanie...</p>;
  if (!user) return <p>Nie jesteś zalogowany.</p>;

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Twój Profil</h2>
      
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {watch("photoURL") ? (
          <img 
            src={watch("photoURL")} 
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
        <div style={{ color: "red", marginBottom: "15px" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="displayName">Nazwa wyświetlana:</label>
          <input
            {...register("displayName")}
            type="text"
            disabled={isLoading}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email">Email:</label>
          <input
            {...register("email")}
            type="email"
            disabled={true}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", backgroundColor: "#e9ecef" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="photoURL">URL zdjęcia:</label>
          <input
            {...register("photoURL")}
            type="url"
            disabled={isLoading}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="street">Ulica:</label>
          <input
            {...register("street")}
            type="text"
            disabled={isLoading}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="city">Miasto:</label>
          <input
            {...register("city")}
            type="text"
            disabled={isLoading}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="zipCode">Kod pocztowy:</label>
          <input
            {...register("zipCode")}
            type="text"
            disabled={isLoading}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            opacity: isLoading ? 0.7 : 1,
            cursor: isLoading ? "not-allowed" : "pointer"
          }}
        >
          {isLoading ? "Ładowanie..." : "Zapisz zmiany"}
        </button>
      </form>
    </div>
  );
}
