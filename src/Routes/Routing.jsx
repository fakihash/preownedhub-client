import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout, AuthLayout, AdminLayout } from "../layout";
import {
  Home,
  Login,
  Register,
  Filters,
  ProductDetail,
  CartPage,
  PaymentMethods,
  UserProfile,
  AdminLogin,
  Dashboard,
  UsersListing,
  ProductsListing,
  ReportsListing,
  ListProduct,
  AddProduct,
  EditProduct,
  About,
  ContactUs,
  ReportProduct,
  PaymentSuccess,
  PaymentFailed,
  EditProfile,
} from "../pages";
import { AdminEditProduct, ReportViewPage, ViewUser } from "../pages/Admin";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Filters />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentMethods />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/product/list" element={<ListProduct />} />
          <Route path="/product/edit/:id" element={<EditProduct />} />
          <Route path="/report/:id" element={<ReportProduct />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
        </Route>

        <Route path="/" element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UsersListing />} />
          <Route path="/admin/products" element={<ProductsListing />} />
          <Route path="/admin/reports" element={<ReportsListing />} />
          <Route path="/admin/users/view/:id" element={<ViewUser />} />
          <Route
            path="/admin/products/view/:id"
            element={<AdminEditProduct />}
          />
          <Route path="/admin/reports/view/:id" element={<ReportViewPage />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/" element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
