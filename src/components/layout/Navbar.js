import React, { useContext, Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const { user, authLoading, logOut } = useContext(AuthContext);
  const classes = useStyles();

  const links = user ? (
    <Fragment>
      <Button color="inherit" style={{ textTransform: "none" }}>
        {user.username}
      </Button>
      <Button color="inherit" onClick={logOut}>
        Log Out
      </Button>
    </Fragment>
  ) : (
    <Fragment>
      <Button color="inherit" component={RouterLink} to="/login">
        Log In
      </Button>
      <Button color="inherit" component={RouterLink} to="/signup">
        Sign Up
      </Button>
    </Fragment>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link component={RouterLink} to="/" color="inherit" underline="none">
            WeView
          </Link>
        </Typography>
        {!authLoading && links}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
