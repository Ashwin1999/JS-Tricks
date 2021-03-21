import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import { setUser } from "../actions/userActions";
import { sampleApiFetchAction } from "../actions/sampleApiActions";

const Login = () => {
  let dispatch = useDispatch();
  let history = useHistory();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/api/auth/login", data, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setUser(res.data));
        dispatch(sampleApiFetchAction(res.data.accessToken));
        history.push("/");
      })
      .catch((error) => {});
  };

  return (
    <div>
      <form>
        <h1 className="display-1">Login</h1>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
        <Link className="btn btn-light" to="/">
          Back To Home
        </Link>
      </form>
    </div>
  );
};

export default Login;
