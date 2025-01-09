'use client';

import { useAuth } from "../../../lib/AuthContext";

function VerifyEmail() {
    const { user } = useAuth();
    return ( 
    <>
        <h1>Email nie zweryfikowany. Zweryfikuj email poprzez link wysłany na twój adres {user?.email}</h1>
    </> );
}

export default VerifyEmail;