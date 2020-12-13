import React, { FunctionComponent, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getAuthState } from "src/api";
import Register from "src/Register";
import GameContainer from "../GameContainer";
import { Header } from "../Header";
import Login from "../Login";
import Snackbar from "../Snackbar";
import Profile from "../Profile";
import ProtectedRoute from "../ProtectedRoute";

export const AuthContext = React.createContext<any[]>([]);
export const SnackbarContext = React.createContext<any[]>([]);

GameContainer.contextType = SnackbarContext;

const App: FunctionComponent<any> = () => {
  const [authState, setAuthState] = useState(getAuthState());
  const [snackbarState, setSnackbarState] = useState({
    id: 0,
    type: "",
    message: "",
  });
  return (
    <Router>
      <AuthContext.Provider value={[authState, setAuthState]}>
        <SnackbarContext.Provider value={[snackbarState, setSnackbarState]}>
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              component={() => <GameContainer authState={authState} />}
            />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <ProtectedRoute path="/profile" component={Profile} />
          </Switch>
          <Snackbar />
        </SnackbarContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
