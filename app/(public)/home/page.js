"use client";

import React from 'react';
import { FaCalendarAlt, FaTasks, FaUserClock } from 'react-icons/fa';

function HomePage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <section style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ color: "#007BFF", marginBottom: "20px" }}>
          Witaj w TaskCalendar
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#666" }}>
          Twoje centrum zarządzania zadaniami i czasem
        </p>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ color: "#333", marginBottom: "20px" }}>
          Co oferuje nasza aplikacja?
        </h2>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "20px" 
        }}>
          <FeatureCard 
            icon={<FaCalendarAlt size={40} />}
            title="Kalendarz"
            description="Intuicyjny kalendarz do planowania i śledzenia twoich zadań"
          />
          
          <FeatureCard 
            icon={<FaTasks size={40} />}
            title="Lista Zadań"
            description="Organizuj swoje zadania w przejrzysty sposób"
          />
          
          <FeatureCard 
            icon={<FaUserClock size={40} />}
            title="Zarządzanie Czasem"
            description="Efektywnie planuj swój czas i zwiększaj produktywność"
          />
        </div>
      </section>

      <section style={{ 
        backgroundColor: "#f8f9fa", 
        padding: "30px", 
        borderRadius: "10px",
        marginBottom: "40px"
      }}>
        <h2 style={{ color: "#333", marginBottom: "20px" }}>
          Jak zacząć?
        </h2>
        <ol style={{ 
          paddingLeft: "20px",
          color: "#666",
          lineHeight: "1.6"
        }}>
          <li>Zarejestruj się lub zaloguj do swojego konta</li>
          <li>Przejdź do kalendarza i zacznij dodawać swoje zadania</li>
          <li>Organizuj zadania według priorytetów</li>
          <li>Śledź swoje postępy i zarządzaj czasem efektywnie</li>
        </ol>
      </section>

      <section style={{ textAlign: "center" }}>
        <p style={{ 
          fontSize: "1.1rem", 
          color: "#666",
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          TaskCalendar to narzędzie, które pomoże Ci lepiej organizować swój czas 
          i zwiększyć produktywność. Dołącz do nas już dziś!
        </p>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div style={{
      padding: "20px",
      borderRadius: "10px",
      backgroundColor: "white",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      textAlign: "center"
    }}>
      <div style={{ 
        color: "#007BFF", 
        marginBottom: "15px" 
      }}>
        {icon}
      </div>
      <h3 style={{ 
        color: "#333",
        marginBottom: "10px"
      }}>
        {title}
      </h3>
      <p style={{ 
        color: "#666",
        lineHeight: "1.5"
      }}>
        {description}
      </p>
    </div>
  );
};

export default HomePage;