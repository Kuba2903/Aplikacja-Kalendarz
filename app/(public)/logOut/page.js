'use client';
import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from "../../lib/AuthContext";

const SignOutPage = () => {
  const { user, loading } = useAuth();
  const auth = getAuth();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    if (user && !loading) {
      setUserEmail(user.email);
      
      signOut(auth)
        .then(() => {
          router.push('/signIn');
        })
        .catch((error) => {
          console.error('Error signing out: ', error);
        });
    }
  }, [user, loading, auth, router]);

  if (loading) {
    return null;
  }

  if (!user) {
    return (
      <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Nie jesteś zalogowany</h2>
        <p>Zaloguj się, aby uzyskać dostęp do tej strony.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Wylogowywanie...</h2>
      <p>Do zobaczenia, {userEmail}!</p>
      <p>Zostaniesz przekierowany do strony logowania.</p>
    </div>
  );
};

export default SignOutPage;
