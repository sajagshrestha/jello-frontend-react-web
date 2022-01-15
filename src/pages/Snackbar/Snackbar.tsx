import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSelector } from "react-redux";

import { useAppDispatch, RootState } from "../../redux";
import { closeSnackbar } from "../../redux/slices/snackbar";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarComponent: React.FC = () => {
  const { isOpen, severity, message } = useSelector(
    (state: RootState) => state.snackbar,
  );

  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(closeSnackbar());

  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
