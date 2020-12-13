import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import { Logout } from "../Logout";
import { AuthContext } from "../App";
import "./header.css";

export const Header = () => {
  const [authState] = React.useContext(AuthContext);
  return (
    <header className="header">
      <div className="header-nav">
        {authState.isLoggedIn && (
          <NavLink to="/profile">
            <Button size="sm" color="primary">
              My Scores
            </Button>
          </NavLink>
        )}
        <NavLink to="/">
          <Button size="sm" color="primary">
            Game
          </Button>
        </NavLink>
        {authState.isLoggedIn ? (
          <Logout authState={authState} />
        ) : (
          <Fragment>
            <NavLink to="/login">
              <Button size="sm" className="float-right" color="primary">
                Log In
              </Button>
            </NavLink>
            <NavLink to="/register">
              <Button size="sm" className="float-right" color="primary">
                Register
              </Button>
            </NavLink>
          </Fragment>
        )}
      </div>
    </header>
  );
};
