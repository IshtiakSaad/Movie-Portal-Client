import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { addUserToDatabase } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userData = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || "Anonymous",
          photoURL: currentUser.photoURL || "",
        };
  
        try {
          await addUserToDatabase(userData);
          console.log("User synced with database.");
        } catch (error) {
          console.error("Error syncing user with database:", error);
        }
      }
  
      setUser(currentUser); 
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);
  

  const logout =  () => {
    setLoading(true);
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
