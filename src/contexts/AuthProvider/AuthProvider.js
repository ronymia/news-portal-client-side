import React, { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import app from '../../Firebase/firebase.config'

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    //provider login
    const providerLogin = (provider) => {
        return signInWithPopup(auth, provider);
    }

    //log out user
    const logOut = () => {
        return signOut(auth);
    }

    // components will unmount
    useEffect(() => {
        const unsubscrip = onAuthStateChanged(auth, (currentUser) => {
            console.log("inside auth state change", user);
            setUser(currentUser);
        })
        return () => unsubscrip();
    }, [])

    const authInfo = { user, providerLogin, logOut };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
