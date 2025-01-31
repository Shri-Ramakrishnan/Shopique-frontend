import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Navbar.css";

export default function Navbar({ userId, pageno = null }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOrderPage, setIsOrderPage] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://shopique-backend-1.onrender.com/api/auth/fetch/${userId}`
        );
        const user = response.data.data;
        console.log("User Name :", user.username);
        setUsername(user.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    if (pageno === "123") {
      setIsOrderPage(true);
    } else {
      setIsOrderPage(false);
    }
  }, [userId, pageno]);

  return (
    <nav className="hm-navbar">
      <div className="nav-logo">
        <h2 onClick={() => navigate("/home")}>SHOPIQUE</h2>
      </div>

      {!isOrderPage ? (
        <>
          {/* <div className="nav-search-bar">
            <input
              type="text"
              placeholder="Search for products..."
              aria-label="Search for products"
            />
            <button className="nav-btns" aria-label="Search">
              <i className="fas fa-search"></i> Search
            </button>
          </div> */}

          <div className="nav-actions">
            <button
              className="nav-btns"
              onClick={() => {
                navigate("/cart", { state: { userId: userId } });
              }}
              aria-label="Go to cart"
            >
              <i className="fas fa-shopping-cart"></i> Cart
            </button>

            {isLoggedIn ? (
              <button
                className="nav-btns my-prof-btn"
                onClick={() => navigate("/profilepage", { state: { userId } })}
                aria-label="Go to profile page"
              >
                <i className="fas fa-user"></i> {username}
              </button>
            ) : (
              <button
                className="nav-btns"
                onClick={() => navigate("/login")}
                aria-label="Login"
              >
                <i className="fas fa-user"></i> Login
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="nav-actions">
          {isLoggedIn ? (
            <button
              className="nav-btns"
              onClick={() => navigate("/profilepage", { state: { userId } })}
              aria-label="Go to profile page"
            >
              <i className="fas fa-user"></i> {username}
            </button>
          ) : (
            <button
              className="nav-btns"
              onClick={() => navigate("/login")}
              aria-label="Login"
            >
              <i className="fas fa-user"></i> Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
