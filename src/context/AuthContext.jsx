import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [dbUser, setDbUser] = useState(null);

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL
    });
  };

  const Login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const provider = new GoogleAuthProvider();

  const googleAuth = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const Logout = () => {
    setLoading(true);
    setDbUser(null);
    return signOut(auth);
  };

  // Fetch user data from MongoDB when Firebase user changes
  const fetchUserFromDb = async uid => {
    try {
      const response = await fetch(`http://localhost:3000/users/${uid}`);
      if (response.ok) {
        const userData = await response.json();
        setDbUser(userData);
      } else {
        setDbUser(null);
      }
    } catch (error) {
      setDbUser(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);

      if (currentUser) {
        fetchUserFromDb(currentUser.uid);
      } else {
        setDbUser(null);
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const userData = {
    user,
    dbUser,
    setUser,
    registerUser,
    updateUserProfile,
    Logout,
    Login,
    loading,
    googleAuth,
    auth
  };

  return (
    <AuthContext.Provider value={userData}>
      {children}
    </AuthContext.Provider>
  );
};
