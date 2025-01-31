import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Sidebar.css";
import { useLocation } from "react-router-dom";

export default function Sidebar({ userId }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://shopique-backend-1.onrender.com/api/auth/fetch/${userId}`
        );
        const username = response.data.data;
        setUsername(username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return (
    <div className="sidebar">
      <div className="user-prof-img">
        <img src={"https://via.placeholder.com/80"} alt="User" />
        <h3>{username}</h3>
        <p>Welcome back!</p>
      </div>

      <ul className="sidebar-menu">
        <li>
          <Link to="/profilepage">
            <i className="fas fa-user"></i> Profile
          </Link>
        </li>
        <li>
          <Link to="/wishlist">
            <i className="fas fa-heart"></i> Wishlist
          </Link>
        </li>
        <li>
          <Link to="/myorders">
            <i className="fas fa-shopping-bag"></i> My Orders
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <i className="fas fa-cog"></i> Settings
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <i className="fas fa-sign-out-alt"></i> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
