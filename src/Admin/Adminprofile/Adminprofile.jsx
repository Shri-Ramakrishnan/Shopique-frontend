import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Adminprofile.css";
import Adnavbar from "../Adnavbar/Adnavbar";

const Adminprofile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, user, orders } = location.state || {};





  const [adminData, setAdminData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    mobile: user?.mobile || "",
    address: user?.address || "",
    image: user?.image || null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdminData({ ...adminData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", adminData.username);
    formData.append("email", adminData.email);
    if (adminData.password) formData.append("password", adminData.password);
    formData.append("mobile", adminData.mobile);
    formData.append("address", adminData.address);
    if (adminData.image instanceof File) {
      formData.append("image", adminData.image);
    }

    try {
      const response = await axios.put(
        `https://shopique-backend-1.onrender.com/admin/update/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        alert("Profile updated successfully!");
        navigate(0);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };






  const handleDashclk = () => {
    navigate("/adhome", { state: { userId, user } });
  };
  const handleprofileclk = () => {
    navigate("/adprof", { state: { userId, user } });
  };

  const handleOrderclk = () => {
    navigate("/adorders", { state: { userId, user, orders } });
  };

  const handleLogout = () => {
    navigate("/home");
  };

  return (
    <div>
      <div className="ad-nav">
        <Adnavbar userId={userId} user={user} />
      </div>
      <div className="admin-container">
        <div className="admin-sidebar">
          <div className="ad-sb-img-cont">
            {user?.image ? (
              <img
                src={`https://shopique-backend-1.onrender.com${user.image}`}
                alt="admin"
                className="ad-sb-img"
              />
            ) : (
              <div className="placeholder-img"></div>
            )}
            <h4 className="ad-sb-username">{user?.username || "Admin"}</h4>
          </div>
          <div className="ad-sb-list-cont">
            <ul className="ad-sb-list-items">
              <li>
                <button className="ad-sb-btns" onClick={handleDashclk}>
                  Dashboard
                </button>
              </li>
              <li>
                <button className="ad-sb-btns" onClick={handleprofileclk}>
                  Profile
                </button>
              </li>
             
              <li>
                <button className="ad-sb-btns" onClick={handleOrderclk}>
                  Orders
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="main-content">
          <header className="admin-header">
            <h1>Welcome to the Admin Dashboard</h1>
            <div className="admin-info">
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </header>

          <div>
            <div className="profile-container">
              <div className="profile-card">
                <div className="profile-header">
                  <div className="profile-image">
                    {previewImage || user?.image ? (
                      <img
                        src={
                          previewImage || `https://shopique-backend-1.onrender.com${user.image}`
                        }
                        alt="Admin"
                      />
                    ) : (
                      <div className="placeholder-img"></div>
                    )}
                  </div>
                  <button
                    className="edit-btn"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Cancel" : "Edit"}
                  </button>
                </div>
                <form onSubmit={handleUpdate} className="profile-form">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="username"
                    value={adminData.username}
                    onChange={handleChange}
                    // disabled={!isEditing}
                  />
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={adminData.email}
                    onChange={handleChange}
                    // disabled={!isEditing}
                  />
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={adminData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    // disabled={!isEditing}
                  />
                  <label>Mobile:</label>
                  <input
                    type="text"
                    name="mobile"
                    value={adminData.mobile}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={adminData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  {isEditing && (
                    <>
                      <label>Profile Image:</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <button type="submit" className="update-btn">
                        Update Profile
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminprofile;
