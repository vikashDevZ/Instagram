/* eslint-disable */

import PropTypes from "prop-types";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { LOGIN } from "../constants/routes";

const ProtectedRoute = ({ user }) => {
  const location = useLocation();

  if (user) {
    return <Outlet />;
  }
  return <Navigate to={LOGIN} state={{ from: location }} />;
};

ProtectedRoute.propTypes = {
  user: PropTypes.object,
};

export default ProtectedRoute;
