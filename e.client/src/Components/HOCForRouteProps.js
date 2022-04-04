import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

function HOCForRouteProps({ Component }) {
  const navigate = useNavigate();
  const location = useLocation();
  return <Component navigate={navigate} location={location} params={useParams()} />;
}

export default HOCForRouteProps;
