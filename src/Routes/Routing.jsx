import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout, AuthLayout } from "../layout";
import {
  Home,
  Login,
  Register,
  Filters,
  ProductDetail,
  CartPage,
  PaymentMethods,
  UserProfile,
} from "../pages";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Filters />} />
          <Route path="/productDetail" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentMethods />} />
          <Route path="/user" element={<UserProfile />} />
        </Route>

        <Route path="/" element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
