import React, { FunctionComponent } from "react";
import { Button, FormGroup, Input } from "reactstrap";
import Label from "reactstrap/lib/Label";
import { register } from "src/api";
import { errorPopup, successPopup } from "src/ui";
import { SnackbarContext } from "../App";
import "./Register.css";

const Register: FunctionComponent<any> = () => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [, setSnackbarState] = React.useContext(SnackbarContext);

  const onRegisterClick = async () => {
    if (!username || !password) {
      errorPopup(setSnackbarState, "Please fill required fields");
      return;
    }
    try {
      const resp = await register({ username, password });
      successPopup(setSnackbarState, resp.message);
      setUsername("");
      setPassword("");
    } catch (err) {
      errorPopup(setSnackbarState, err.message);
    }
  };

  return (
    <div className="register">
      <FormGroup>
        <Label>Register</Label>
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
      <Button color="primary" onClick={onRegisterClick}>
        Submit
      </Button>
    </div>
  );
};

export default Register;
