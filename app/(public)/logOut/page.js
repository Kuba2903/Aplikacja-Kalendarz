'use client';
import React from 'react';
import { signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from "../../lib/AuthContext"; // Importujemy useAuth

const SignOutPage = () => {
  const { user } = useAuth(); // Uzyskujemy dostęp do zalogowanego użytkownika
  const auth = getAuth();
  const router = useRouter();

  const handleSignOut = (e) => {
    e.preventDefault();

    signOut(auth)
      .then(() => {
        // Po pomyślnym wylogowaniu, przekierowanie na stronę główną lub logowania
        router.push('/user/signin');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
        // Opcjonalnie możesz dodać komunikat o błędzie
      });
  };

  if (!user) {
    // Jeśli użytkownik nie jest zalogowany, nie pokazuj formularza wylogowania
    return (
      <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>You are not logged in</h2>
        <p>Please log in to access this page.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Sign Out</h2>
      <form onSubmit={handleSignOut}>
        <div style={{ marginBottom: '15px' }}>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#FF6347', // Możesz zmienić kolor na inny
              color: 'white',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            Sign Out
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignOutPage;
