import React, { FunctionComponent, useEffect } from "react";
import { SnackbarContext } from "../App";
import { Alert } from "reactstrap";
import "./Snackbar.css";
import { join } from "lodash";

const Snackbar: FunctionComponent<any> = () => {
  const [snackbarState] = React.useContext(SnackbarContext);
  const [animationState, setAnimationState] = React.useState("");
  useEffect(() => {
    if (!snackbarState.message) return;
    setAnimationState("fadeIn");
    setTimeout(() => {
      setAnimationState("fadeOut");
    }, 4000);
  }, [snackbarState.id]);

  const classes = join(["snackbar", animationState], " ");
  return snackbarState.message.length > 0 ? (
    <div className={classes}>
      <Alert color={snackbarState.type}>{snackbarState.message}</Alert>
    </div>
  ) : null;
};

export default Snackbar;
