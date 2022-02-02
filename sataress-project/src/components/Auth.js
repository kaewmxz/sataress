import React, { useState, useEffect } from 'react'
import { auth } from '../services/firebase'
import Loadpage from './Loadpage'

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        })
    }, [])

    if (loading) {
        return <Loadpage/>
    }
    return (
        <AuthContext.Provider value = {{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}