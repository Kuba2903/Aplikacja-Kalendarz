'use client';
import React, { useState } from 'react';
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { useSearchParams, useRouter } from 'next/navigation';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth();
  const params = useSearchParams();
  const router = useRouter();
  const returnUrl = params.get('returnUrl') || '/'; 

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setError('Błędny adres email.');
      return;
    }
    if (password.length < 6) {
      setError('Hasło musi posiadać przynajmniej 6 znaków');
      return;
    }

    setError('');
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then(() => {
        router.push(returnUrl);
      })
      .catch((error) => {
        setError('Błąd logowania');
      });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Zaloguj się</h2>
      
      {error && (
        <div className="alert alert-error" style={{ marginBottom: '15px' }}>
          <span>{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSignIn}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Hasło:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px' }}>
          Zaloguj się
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
