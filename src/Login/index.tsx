import React, { FunctionComponent } from "react";
import { Button, FormGroup, Input } from "reactstrap";
import { AuthContext, SnackbarContext } from "../App";
import { getAuthState, login } from "src/api";
import { Redirect } from "react-router-dom";
import Label from "reactstrap/lib/Label";
import "./Login.css";
import { errorPopup } from "src/ui";

const Login: FunctionComponent<any> = () => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [authState, setAuthState] = React.useContext(AuthContext);
  const [, setSnackbarState] = React.useContext(SnackbarContext);

  const onLoginClick = async () => {
    if (!username || !password) {
      errorPopup(setSnackbarState, "Please fill required fields");
      return;
    }
    try {
      const token = await login({ username, password });
      localStorage.setItem("token", token.token);
      setAuthState(getAuthState());
    } catch (err) {
      setPassword("");
      setSnackbarState({
        id: Math.random(),
        type: "danger",
        message: err.message,
      });
    }
  };

  if (authState.isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div className="login">
      <FormGroup>
        <Label>Login</Label>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <Button color="primary" onClick={onLoginClick}>
        Submit
      </Button>
    </div>
  );
};

export default Login;
