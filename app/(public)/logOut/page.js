'use client';

import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase"; // Import Firebase auth
import { useAuth } from "../../lib/AuthContext";
import { useRouter } from "next/navigation"; // Wykorzystaj router do przekierowania

export default function LogoutButton() {
  const { user } = useAuth(); // Uzyskanie informacji o użytkowniku z AuthContext
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Wylogowanie użytkownika
      router.push("/"); // Przekierowanie do strony głównej po wylogowaniu
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return user ? (
    <button
      onClick={handleLogout}
      style={{
        padding: "0.75rem",
        backgroundColor: "#ff4747", // Czerwony dla przycisku wylogowania
        color: "#ffffff",
        border: "none",
        borderRadius: "4px",
        fontSize: "1rem",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  ) : (
    <p>You are not logged in</p> // Jeśli użytkownik nie jest zalogowany
  );
}
