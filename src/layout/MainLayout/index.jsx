import React from "react";
import { Categories, Footer, Header } from "../../components";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  const hiddenRoutes = [
    "/about",
    "/contactus",
    "/profile",
    "/payment-success",
    "/payment-failed",
  ];
  const shouldHideCategories = hiddenRoutes.includes(location.pathname);
  return (
    <main>
      <Header />
      {!shouldHideCategories && (
        <div className="px-10 py-4">
          <Categories />
        </div>
      )}
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
