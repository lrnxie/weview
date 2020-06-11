import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../config/firebase";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [authLoading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  const logIn = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setUser({ id: res.user.uid, email: res.user.email });
        setAlert(null);
      })
      .catch((err) => {
        setAlert(err.message);
      });
  };

  const signUp = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        db.collection("users").doc(res.user.uid).set({ email: res.user.email });
        setAlert(null);
      })
      .catch((err) => {
        setAlert(err.message);
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
      setLoading(false);
    });
    return () => {
      unsbuscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, authLoading, alert, logIn, signUp, logOut }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
