import * as React from "react";
import { FunctionComponent } from "react";

import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "src/App";

const ProtectedRoute: FunctionComponent<any> = ({
  component: Component,
  ...rest
}) => {
  const [authState] = React.useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        authState.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
