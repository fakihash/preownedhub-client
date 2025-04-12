import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login";
import AddProduct from "../pages/AddProduct";
import UserLayout from "../layout/UserLayout";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
        </Route>

        <Route path="/" element={<UserLayout />}>
          <Route path="/add" element={<AddProduct />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routing;
