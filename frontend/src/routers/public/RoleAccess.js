import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const RoleAccess = ({ roles = [] }) => {
  const { user } = useSelector((auth) => auth.user);
  return !roles.length || roles.includes(user?.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default RoleAccess;
