"use client";

import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>404 - Strona nie znaleziona</h1>
      <p>Strona którą szukasz nie istnieje.</p>
      <button
        onClick={handleGoHome}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Wróć do strony głównej
      </button>
    </div>
  );
};

export default NotFoundPage;
