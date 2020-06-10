import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    margin: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      width: 300,
      margin: theme.spacing(1),
    },
  },
}));

const SignUp = ({ history }) => {
  const { user, authLoading, signUp } = useContext(AuthContext);
  const classes = useStyles();
  const [info, setInfo] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const { email, password, password2 } = info;

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(email, password);
  };

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  });

  return (
    !authLoading && (
      <div className={classes.root}>
        <Typography variant="h6">Sign Up</Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            autoFocus
            variant="outlined"
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            label="Confirm Password"
            type="password"
            name="password2"
            value={password2}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </form>
      </div>
    )
  );
};

export default SignUp;
