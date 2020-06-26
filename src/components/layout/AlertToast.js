import React, { useContext, useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import { AuthContext } from "../../contexts/AuthContext";

const AlertToast = () => {
  const { alert } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (alert !== null) {
      setOpen(true);
    }
  }, [alert]);

  return (
    alert && (
      <div>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alert.type}
            elevation={6}
            variant="filled"
          >
            {alert.msg}
          </Alert>
        </Snackbar>
      </div>
    )
  );
};

export default AlertToast;
