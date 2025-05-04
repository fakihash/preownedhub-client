import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../../components";

const AuthLayout = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default AuthLayout;
