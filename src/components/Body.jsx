// src/components/Body.js
import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);

  // List of public routes where we never redirect to /login
  const publicRoutes = ["/", "/login", "/signup"];

  // Re-fetch user on mount if not already in store
  const fetchUser = async () => {
    // If user is already in Redux, skip (redux-persist)
    if (user) return;

    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data)); // Set user in store
    } catch (err) {
      // Only redirect to login if this is NOT a public route
      if (err.response?.status === 401 && !publicRoutes.includes(location.pathname)) {
        dispatch(removeUser());
        navigate("/login", { replace: true });
      }
      console.error(err?.response?.data || err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // Empty dependency array: runs once on mount

  // This component is only rendered for protected routes (/feed, /profile, etc.)
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
