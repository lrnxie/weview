import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../config/firebase";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const logIn = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setUser({ id: res.user.uid, email: res.user.email });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signUp = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        db.collection("users").doc(res.user.uid).set({ email: res.user.email });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logOut = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    const unsbuscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({ id: user.uid, email: user.email });
      }
    });
    return () => {
      unsbuscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, logIn, signUp, logOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};
