import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";

import { AuthContext } from "../../contexts/AuthContext";
import { RatingContext } from "../../contexts/RatingContext";

const useStyles = makeStyles((theme) => ({
  rating: {
    display: "flex",
    alignItems: "center",
    "& > p": {
      marginLeft: theme.spacing(1),
    },
  },
}));

const UserRating = ({ type, media_id, title, poster_path }) => {
  const classes = useStyles();
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
      <div className={classes.rating}>
        <Rating name="rating" value={initRating} onChange={handleChange} />
        <Typography variant="body2">My Rating</Typography>
      </div>
    )
  );
};

export default UserRating;
