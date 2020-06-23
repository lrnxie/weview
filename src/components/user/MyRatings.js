import React, { useContext } from "react";

import Typography from "@material-ui/core/Typography";

import { RatingContext } from "../../contexts/RatingContext";

const MyRatings = () => {
  const { ratings } = useContext(RatingContext);
  console.log(ratings);

  return (
    <div>
      <Typography>My Ratings</Typography>
    </div>
  );
};

export default MyRatings;
