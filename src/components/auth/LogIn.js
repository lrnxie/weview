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

const LogIn = ({ history }) => {
  const { user, logIn } = useContext(AuthContext);
  const classes = useStyles();
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const { email, password } = info;

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(email, password);
  };

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  });

  return (
    <div className={classes.root}>
      <Typography variant="h6">Log In</Typography>
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
        <Button type="submit" variant="contained" color="primary">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default LogIn;
