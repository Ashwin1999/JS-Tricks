import React, { useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import {
  sampleApiFetchAction,
  sampleApiRemoveAction,
} from "./actions/sampleApiActions";
import { setUser, removeUser } from "./actions/userActions";

import Login from "./pages/Login";
import Restricted from "./pages/Restricted";
import Landing from "./pages/Landing";
import Other from "./pages/Other";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    // async fn to fetch sample data from api ... if and only if user is logged in
    const fetchAPI = async (token) => {
      dispatch(sampleApiFetchAction(token));
    };

    // conditionals
    if (Cookies.get()["user"] === undefined) {
    } else {
      let user = JSON.parse(Cookies.get("user"));
      dispatch(setUser(user));
      fetchAPI();
    }
  }, [dispatch]);

  const logoutHandler = () => {
    if (user !== null) {
      dispatch(removeUser());
      dispatch(sampleApiRemoveAction());
      Cookies.remove("user");
    }
  };

  return (
    <div>
      {user && (
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                Navbar
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/other1">
                      Other Page 1
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/other2">
                      Other Page 2
                    </Link>
                  </li>
                </ul>
                <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a
                      href="#logout"
                      className="nav-link"
                      onClick={logoutHandler}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      )}
      <div className="container my-4">
        <Switch>
          <Route path="/" exact component={!user ? Landing : Restricted} />
          <Route path="/other1" exact component={!user ? Landing : Other} />
          <Route path="/other2" exact component={!user ? Landing : Other} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
