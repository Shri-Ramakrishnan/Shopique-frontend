import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomeStyle.css";
import bannerImage from "../../assets/banner1.jpeg";
import bannerImage1 from "../../assets/banner2.jpeg";
import bannerImage2 from "../../assets/banner3.jpeg";

const HomePage = () => {
  const navigate = useNavigate();
  const [mobiles, setMobiles] = useState([]);
  const [clothings, setClothings] = useState([]);
  const [homeAppliances, setHomeAppliances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bannerImages = [bannerImage, bannerImage1, bannerImage2];
  const [currentImage, setCurrentImage] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mobilesRes, clothingsRes, homeAppliancesRes] = await Promise.all(
          [
            fetch("https://shopique-backend-1.onrender.com/api/mobiles/fetch"),
            fetch("https://shopique-backend-1.onrender.com/api/clothings/fetch"),
            fetch("https://shopique-backend-1.onrender.com/api/hoappliances/fetch"),
          ]
        );

        if (!mobilesRes.ok || !clothingsRes.ok || !homeAppliancesRes.ok) {
          throw new Error("Error fetching data from one or more endpoints.");
        }

        const mobilesData = await mobilesRes.json();
        const clothingsData = await clothingsRes.json();
        const homeAppliancesData = await homeAppliancesRes.json();

        setMobiles(mobilesData);
        setClothings(clothingsData);
        setHomeAppliances(homeAppliancesData);
        console.log(mobilesData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  useEffect(() => {
    const targetDate = new Date("2025-02-01T00:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="hm-navbar">
        <div className="nav-logo">
          <h2 onClick={() => navigate("/home")}>SHOPIQUE</h2>
        </div>
        <div className="nav-search-bar">
          <input
            type="text"
            placeholder="Search for products..."
            aria-label="Search for products"
          />
          <button>
            <i className="fas fa-search"></i> Search
          </button>
        </div>
        <div className="nav-actions">
          <button id="cart">
            <i className="fas fa-shopping-cart"></i> Cart
          </button>
          <button id="login">
            <i className="fas fa-user"></i> Login
          </button>
        </div>
      </nav>

      <div className="main-container">
        <div className="content">
          {/* Ad Banner */}
          <div className="banner-section">
            <div className="ad-banner">
              <img
                src={bannerImages[currentImage]}
                alt={`Banner ${currentImage + 1}`}
              />

            </div>
            <div className="countdown-timer">
              <h3>Hurry up! Limited time offer:</h3>
              <div className="timer">
                <div>
                  <span>{timeLeft.days}</span> Days
                </div>
                <div>
                  <span>{timeLeft.hours}</span> Hours
                </div>
                <div>
                  <span>{timeLeft.minutes}</span> Minutes
                </div>
                <div>
                  <span>{timeLeft.seconds}</span> Seconds
                </div>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div className="categories">
            {error && <p className="error">{error}</p>}

            <div className="category">
              <h3>Mobiles</h3>
              <div className="product-list">
                {loading ? (
                  <p>Loading products...</p>
                ) : (
                  mobiles.map((item) => (
                    <div className="product-card" key={item.id || item._id}>
                      <Link
                        to={`/${item.route}`}
                        state={{
                          name: item.name,
                          price: item.price,
                          brand: item.brand,
                          image: item.image,
                          rating: item.rating,
                          description: item.description,
                          stock: item.stock,
                          route: item.route,
                          category: item.category,
                          deliverytime: item.deliverytime,
                        }}
                      >
                        <img
                          src={`https://shopique-backend-1.onrender.com${item.image}`}
                          alt={item.name}
                          className="product-image"
                        />
                        <h4>{item.name}</h4>
                        <p>{item.price}</p>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="category">
              <h3>Clothings</h3>
              <div className="product-list">
                {loading ? (
                  <p>Loading products...</p>
                ) : (
                  clothings.map((item) => (
                    <div className="product-card" key={item.id || item._id}>
                      <Link
                        to={`/${item.route}`}
                        state={{
                          name: item.name,
                          price: item.price,
                          brand: item.brand,
                          image: item.image,
                          rating: item.rating,
                          description: item.description,
                          stock: item.stock,
                          route: item.route,
                          category: item.category,
                          deliverytime: item.deliverytime,
                        }}
                      >
                        <img
                          src={`https://shopique-backend-1.onrender.com${item.image}`}
                          alt={item.name}
                          className="product-image"
                        />
                        <h5>{item.description}</h5>
                        <p>{item.price}</p>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="category">
              <h3>Home Appliances</h3>
              <div className="product-list">
                {loading ? (
                  <p>Loading products...</p>
                ) : (
                  homeAppliances.map((item) => (
                    <div className="product-card" key={item.id || item._id}>
                      <Link
                        to={`/${item.route}`}
                        state={{
                          name: item.name,
                          price: item.price,
                          brand: item.brand,
                          image: item.image,
                          rating: item.rating,
                          description: item.description,
                          stock: item.stock,
                          route: item.route,
                          category: item.category,
                          deliverytime: item.deliverytime,
                        }}
                      >
                        <img
                          src={`https://shopique-backend-1.onrender.com${item.image}`}
                          alt={item.name}
                          className="product-image"
                        />
                        <h5>{item.description}</h5>
                        <p>{item.price}</p>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 E-Commerce Website. All rights reserved.</p>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
