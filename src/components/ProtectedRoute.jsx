// src/components/ProtectedRoute.js
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const user = useSelector((store) => store.user);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
