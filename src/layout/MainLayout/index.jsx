import React from "react";
import { Categories, Footer, Header } from "../../components";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main>
      <Header />
      <div className="p-10">
        <Categories />
      </div>
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
