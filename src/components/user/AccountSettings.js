import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { AuthContext } from "../../contexts/AuthContext";
import DeleteUser from "./DeleteUser";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  form: {
    maxWidth: 800,
    margin: "auto",
  },
  list: {
    "& > *": {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "baseline",
    },
  },
  listItemText: {
    width: 100,
  },
  textField: {
    width: 550,
  },
}));

const AccountSettings = () => {
  const classes = useStyles();
  const { user, authLoading, updateUsername, updatePassword } = useContext(
    AuthContext
  );

  const validation = Yup.object({
    username: Yup.string()
      .trim()
      .max(20, "Username should be less than 20 characters")
      .required("Username cannot be empty"),
    password: Yup.string().min(6, "Password should be at least 6 characters"),
    passwordConfirm: Yup.string().when("password", {
      is: (password) => password && password.length > 0,
      then: Yup.string()
        .required("Confirm your password")
        .oneOf([Yup.ref("password")], "Passwords do not match"),
    }),
  });

  const handleSubmit = (values) => {
    if (values.username.trim() !== user.username) {
      updateUsername(values.username.trim(), user.id);
    }

    if (values.password) {
      updatePassword(values.password);
    }
  };

  return (
    !authLoading && (
      <div className={classes.root}>
        <Typography variant="h6" gutterBottom>
          Account Settings
        </Typography>

        <Formik
          enableReinitialize={true}
          initialValues={{
            username: user.username,
            password: "",
            passwordConfirm: "",
          }}
          validationSchema={validation}
          onSubmit={(values) => handleSubmit(values)}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit} className={classes.form}>
              <List className={classes.list}>
                <ListItem>
                  <ListItemText
                    primary="Username"
                    className={classes.listItemText}
                  />
                  <TextField
                    className={classes.textField}
                    variant="outlined"
                    name="username"
                    value={props.values.username}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={
                      props.touched.username &&
                      props.errors.username !== undefined
                    }
                    helperText={props.touched.username && props.errors.username}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="Email"
                    className={classes.listItemText}
                  />
                  <TextField
                    className={classes.textField}
                    disabled
                    variant="outlined"
                    value={user.email}
                    helperText="Email cannot be changed"
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="Password"
                    className={classes.listItemText}
                  />
                  <TextField
                    className={classes.textField}
                    variant="outlined"
                    type="password"
                    name="password"
                    value={props.values.password}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={
                      props.touched.password &&
                      props.errors.password !== undefined
                    }
                    helperText={
                      props.touched.password && props.errors.password
                        ? props.errors.password
                        : "Enter only if changing password"
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="Confirm password"
                    className={classes.listItemText}
                  />
                  <TextField
                    className={classes.textField}
                    variant="outlined"
                    type="password"
                    name="passwordConfirm"
                    value={props.values.passwordConfirm}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={
                      props.touched.passwordConfirm &&
                      props.errors.passwordConfirm !== undefined
                    }
                    helperText={
                      props.touched.passwordConfirm &&
                      props.errors.passwordConfirm
                    }
                  />
                </ListItem>
              </List>

              <Button variant="contained" color="primary" type="submit">
                Save changes
              </Button>
            </form>
          )}
        </Formik>

        <DeleteUser />
      </div>
    )
  );
};

export default AccountSettings;
