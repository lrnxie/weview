import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { AuthContext } from "../../contexts/AuthContext";

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
  const { user, authLoading, logIn } = useContext(AuthContext);
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      logIn(values.email.trim(), values.password);
    },
  });

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  });

  return (
    !authLoading && (
      <div className={classes.root}>
        <Typography variant="h6">Log In</Typography>

        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <TextField
            autoFocus
            variant="outlined"
            label="Email"
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email !== undefined}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.password && formik.errors.password !== undefined
            }
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button type="submit" variant="contained" color="primary">
            Log In
          </Button>
        </form>
      </div>
    )
  );
};

export default LogIn;
