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

const SignUp = ({ history }) => {
  const { user, authLoading, signUp } = useContext(AuthContext);
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .trim()
        .max(20, "Username should be less than 20 characters")
        .required("Username is required"),
      email: Yup.string()
        .trim()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password should be at least 6 characters")
        .required("Password is required"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm your password"),
    }),
    onSubmit: (values) => {
      signUp(values.username.trim(), values.email.trim(), values.password);
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
        <Typography variant="h6">Sign Up</Typography>

        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <TextField
            autoFocus
            variant="outlined"
            label="Username"
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.username && formik.errors.username !== undefined
            }
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
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
          <TextField
            variant="outlined"
            label="Confirm Password"
            type="password"
            name="passwordConfirm"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.passwordConfirm &&
              formik.errors.passwordConfirm !== undefined
            }
            helperText={
              formik.touched.passwordConfirm && formik.errors.passwordConfirm
            }
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
