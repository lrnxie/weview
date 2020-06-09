import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  poster: {
    height: "225px",
    width: "100%",
    objectFit: "scale-down",
  },
  progress: {
    padding: theme.spacing(20),
  },
}));

const SingleLineGridList = ({ tileData, loading }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {loading ? (
        <CircularProgress className={classes.progress} />
      ) : (
        <GridList className={classes.gridList} cols={5.3} cellHeight="auto">
          {tileData.map((tile) => (
            <GridListTile key={tile.id}>
              <Link
                component={RouterLink}
                to={`/${tile.media_type}/${tile.id}`}
                color="inherit"
                underline="none"
              >
                <img
                  className={classes.poster}
                  src={`https://image.tmdb.org/t/p/w500/${tile.poster_path}`}
                  alt=""
                />
                <Typography variant="subtitle1" align="center">
                  {tile.name || tile.title}
                </Typography>
              </Link>
              <Typography variant="subtitle2" align="center">
                <span role="img" aria-label="star">
                  ⭐️
                </span>
                {tile.vote_average === 0 ? "N/A" : tile.vote_average}
              </Typography>
            </GridListTile>
          ))}
        </GridList>
      )}
    </div>
  );
};

export default SingleLineGridList;
