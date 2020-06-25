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
      .catch((err) => setAlert(err.message));
  };

  const signUp = (username, email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        auth.currentUser.updateProfile({ displayName: username }).then(() => {
          db.collection("users")
            .doc(res.user.uid)
            .set({ username, email: res.user.email });
          setUser({
            id: res.user.uid,
            email: res.user.email,
            username: res.user.displayName,
          });
        });
      })
      .catch((err) => setAlert(err.message));
  };

  const logOut = () => {
    auth.signOut().then(() => setUser(null));
  };

  const updateUsername = (newUsername, userId) => {
    auth.currentUser.updateProfile({ displayName: newUsername }).then(() => {
      db.collection("users").doc(userId).update({ username: newUsername });
      setUser({ ...user, username: newUsername });
      console.log("Username updated");
    });
  };

  const updatePassword = (newPassword) => {
    auth.currentUser
      .updatePassword(newPassword)
      .then(() => console.log("Password updated"))
      .catch((err) => console.log(err.message));
  };

  const deleteUser = () => {
    auth.currentUser
      .delete()
      .then(() => {
        console.log("User deleted");
        setUser(null);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    const unsbuscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          id: user.uid,
          email: user.email,
          username: user.displayName,
        });
      }
      setLoading(false);
    });
    return () => {
      unsbuscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        alert,
        setAlert,
        logIn,
        signUp,
        logOut,
        updateUsername,
        updatePassword,
        deleteUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
