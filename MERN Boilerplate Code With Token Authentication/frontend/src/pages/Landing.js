import React from "react";
import { Link } from "react-router-dom";

const Public = () => {
  return (
    <div>
      <h1 className="display-1">Landing Page</h1>
      <br />
      <Link className="btn btn-light" to="/login">
        Login
      </Link>
    </div>
  );
};

export default Public;
