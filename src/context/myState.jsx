import { useEffect, useState } from "react";
import myContext from "./myContext";
import { auth } from "../firebase/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
// myContext;

const MyState = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <myContext.Provider value={{ loading, setLoading, isAuthenticated }}>
      {children}
    </myContext.Provider>
  );
};

export default MyState;
