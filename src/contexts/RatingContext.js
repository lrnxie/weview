import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../config/firebase";
import { AuthContext } from "./AuthContext";

export const RatingContext = createContext();

export const RatingContextProvider = (props) => {
  const { user } = useContext(AuthContext);
  const [ratings, setRatings] = useState([]);
  const [ratingLoading, setLoading] = useState(true);

  const updateRating = (ratingInfo, ratingId) => {
    ratingId
      ? db
          .collection("users")
          .doc(user.id)
          .collection("ratings")
          .doc(ratingId)
          .update({ rating: ratingInfo.rating })
      : db
          .collection("users")
          .doc(user.id)
          .collection("ratings")
          .add({ ...ratingInfo, created_at: Date.now() });
  };

  useEffect(() => {
    if (user) {
      const unsubscribe = db
        .collection("users")
        .doc(user.id)
        .collection("ratings")
        .orderBy("created_at", "desc")
        .onSnapshot((snapshot) => {
          const userRatings = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRatings(userRatings);
          setLoading(false);
        });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return (
    <RatingContext.Provider value={{ ratings, ratingLoading, updateRating }}>
      {props.children}
    </RatingContext.Provider>
  );
};
