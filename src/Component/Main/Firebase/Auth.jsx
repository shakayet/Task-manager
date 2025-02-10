import { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    // Google Sign-In function
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userData = {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            };

            console.log("Google User Data: ", userData);

            // Send user data to backend to register
            const response = await axios.post("http://localhost:5000/register", userData);

            if (response.status === 201) {
                console.log("User registered successfully", response.data);
                setUser(response.data.user);  // Update state with new user info
            } else {
                console.error("Error registering user:", response.data);
            }
        } catch (error) {
            console.error("Error signing in with Google:", error.message);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [auth]);

    const authInfo = {
        user,
        loading,
        signInWithGoogle
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
