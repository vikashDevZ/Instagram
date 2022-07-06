/* eslint-disable */
import React from 'react'
import PropTypes from "prop-types";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { LOGIN } from "../constants/routes";

const redirectLogdUser = ({ user }) => {
  const location = useLocation();

  if (!user) {
    return <Outlet />;
  }
  return <Navigate to="/" state={{ from: location }} />;
};

redirectLogdUser.propTypes = {
  user: PropTypes.object,
};

export default redirectLogdUser;
