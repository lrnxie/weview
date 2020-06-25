import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import { AuthContext } from "../../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    maxWidth: 800,
    margin: "auto",
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const DeleteUser = () => {
  const classes = useStyles();
  const { deleteUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Divider />
      <Typography gutterBottom className={classes.title}>
        Delete Account
      </Typography>
      <Typography gutterBottom variant="body2" color="textSecondary">
        Once you delete your account, there is no going back. Please be certain.
      </Typography>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setOpen(true)}
      >
        Delete User
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete your account?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will no longer have access to this account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => {
              deleteUser();
              setOpen(false);
            }}
            color="secondary"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteUser;
