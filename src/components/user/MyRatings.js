import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Rating from "@material-ui/lab/Rating";

import { RatingContext } from "../../contexts/RatingContext";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  card: {
    width: 170,
  },
  media: {
    height: 200,
    objectFit: "scale-down",
  },
}));

const MyRatings = () => {
  const classes = useStyles();
  const { ratings, updateRating } = useContext(RatingContext);

  const handleChange = (e, ratingId) => {
    const ratingInfo = {
      rating: +e.target.value,
    };
    updateRating(ratingInfo, ratingId);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>
        My Ratings
      </Typography>
      {ratings.length ? (
        <Grid container spacing={2}>
          {ratings.map((rating) => (
            <Grid item xs={6} sm="auto" key={rating.id}>
              <Card className={classes.card}>
                <CardActionArea
                  component={RouterLink}
                  to={`/${rating.type}/${rating.media_id}`}
                >
                  <CardMedia
                    component="img"
                    className={classes.media}
                    image={`https://image.tmdb.org/t/p/w500/${rating.poster_path}`}
                  />
                  <CardContent>
                    <Typography>{rating.title}</Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions>
                  <Rating
                    name={rating.id}
                    value={rating.rating}
                    onChange={(e) => handleChange(e, rating.id)}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography align="center">You have not rated anything yet</Typography>
      )}
    </div>
  );
};

export default MyRatings;
