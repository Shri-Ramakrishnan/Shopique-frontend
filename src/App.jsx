import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductAddPage from './Admin/Productadd';
import HomePage from './screens/Homepage/HomePage';
import SignUp from './LogSin/SignUp';
import Login from './LogSin/Login';
import ProductPage from './screens/Productscreens/Products';
import ProductList from './screens/Productscreens/ProductList';
import Cart from './screens/Productscreens/Cart';
import Navbar from './screens/navbar/Navbar';
import Orderdetails from './screens/Order/Orderdetails';
import Orderhistory from './screens/Order/Orderhistory';
import Sidebar from './screens/sidebar/Sidebar';
import ProfilePage from './screens/profiledetails/ProfilePage';
import AdminHome from './Admin/homepage/AdminHome';
import Adnavbar from './Admin/Adnavbar/Adnavbar';
import Adminorders from './Admin/Adminorders/Adminorders';
import Adminprofile from './Admin/Adminprofile/Adminprofile';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Set initial route */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/prodlist" element={<ProductList />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/adprod" element={<ProductAddPage />} />
        <Route path="/orderdet" element={<Orderdetails />} />
        <Route path="/myorders" element={<Orderhistory />} />
        <Route path="/side" element={<Sidebar />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/adhome" element={<AdminHome />} />
        <Route path="/adnavbar" element={<Adnavbar />} />
        <Route path="/adorders" element={<Adminorders />} />
        <Route path="/adprof" element={<Adminprofile />} />

      </Routes>
    </Router>
  );
};

export default App;
