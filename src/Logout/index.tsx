import React, { Fragment, FunctionComponent } from "react";
import { Button } from "reactstrap";
import { AuthState, getAuthState } from "src/api";
import { AuthContext } from "../App";

interface IProps {
  authState: AuthState;
}

export const Logout: FunctionComponent<IProps> = ({ authState }) => {
  const [, setAuthState] = React.useContext(AuthContext);

  const onLogout = () => {
    localStorage.removeItem("token");
    setAuthState(getAuthState());
  };
  return (
    <Fragment>
      <Button
        color="primary"
        onClick={onLogout}
        size="sm"
        className="float-right"
      >
        Log out
      </Button>
      <label className="label float-right">Welcome {authState.userName}</label>
    </Fragment>
  );
};
