import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, price, brand, stock, description, image, rating, category, deliverytime } =
    location.state || {}; // Fallback to prevent errors

  const [activeDropdown, setActiveDropdown] = useState(null); // Track which dropdown is open
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  const handleDropdownClick = (dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown)); // Toggle the dropdown
  };

  const handleAddToCart = () => {
    alert(`${name} added to cart!`);
    // Add your "Add to Cart" logic here
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Add search logic here
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="hm-navbar">
        <div className="nav-logo">
          <h2 onClick={() => navigate("/home")}>SHOPIQUE</h2>
        </div>
        <div className="nav-search-bar">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search for products"
          />
          <button><i className="fas fa-search"></i> Search</button>
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

      {/* Product Page */}
      <div className="productlist-page">
        {/* Filters Section */}
        

        {/* Product Details Section */}
        <div className="productlist-container">
          {/* Product Image */}
          <div className="productlist-image">
            {image ? (
              <img src={`http://localhost:5000${image}`} alt={name} />
            ) : (
              <p>No image available</p>
            )}
          </div>

          {/* Product Details */}
          <div className="product-details">
            <h2 className="product-name">{name || "Product Name"}</h2>
            <p className="product-price">
              <strong>Price:</strong> ₹{price || "N/A"}
            </p>
            <p className="product-brand">
              <strong>Brand:</strong> {brand || "N/A"}
            </p>
            <p className="product-rating">
              <strong>Rating:</strong> {rating || "N/A"} ⭐
            </p>
            <p className="product-category">
              <strong>Category:</strong> {category || "N/A"}
            </p>
            <p className="product-delivery-time">
              <strong>Delivery Time:</strong> {deliverytime || "N/A"}
            </p>
            <p className="product-description">
              <strong>Description:</strong> {description || "No description available"}
            </p>
            <p className="product-stock">
              <strong>Stock:</strong>{" "}
              {stock > 0 ? `${stock} available` : "Out of stock"}
            </p>
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={stock <= 0}
            >
              {stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={stock <= 0}
            >
              {stock > 0 ? "Buy now" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
