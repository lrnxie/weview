import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";

import { AuthContext } from "../../contexts/AuthContext";
import { RatingContext } from "../../contexts/RatingContext";

const UserRating = ({ type, media_id, title, poster_path }) => {
  const { user } = useContext(AuthContext);
  const { ratings, ratingLoading, updateRating } = useContext(RatingContext);

  const matchRating = ratings.find((rating) => rating.media_id === media_id);
  const initRating = !ratingLoading && matchRating ? matchRating.rating : null;

  const handleChange = (e) => {
    const ratingInfo = {
      media_id,
      rating: +e.target.value,
      type,
      title,
      poster_path,
    };
    const ratingId = matchRating ? matchRating.id : null;
    updateRating(ratingInfo, ratingId);
  };

  return (
    user &&
    !ratingLoading && (
      <>
        <Rating name="rating" value={initRating} onChange={handleChange} />
        <Typography variant="body2">My Rating</Typography>
      </>
    )
  );
};

export default UserRating;
