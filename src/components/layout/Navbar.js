import React, { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { user, authLoading, logOut } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menu = (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <MenuList>
        <MenuItem onClick={handleClose} component={RouterLink} to="/ratings">
          My Ratings
        </MenuItem>
        <MenuItem onClick={handleClose} component={RouterLink} to="/settings">
          Account Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            logOut();
            handleClose();
          }}
        >
          Log Out
        </MenuItem>
      </MenuList>
    </Popover>
  );

  const links = user ? (
    <>
      <Button
        color="inherit"
        style={{ textTransform: "none" }}
        onClick={handleClick}
      >
        Hi, {user.username}
      </Button>
      {menu}
    </>
  ) : (
    <>
      <Button color="inherit" component={RouterLink} to="/login">
        Log In
      </Button>
      <Button color="inherit" component={RouterLink} to="/signup">
        Sign Up
      </Button>
    </>
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
