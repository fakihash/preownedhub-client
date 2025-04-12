import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import Products from "../Products";

const CategorySection = ({ title, products }) => {
  return (
    <section className="mb-10">
      <div className="px-4 md:px-8 mb-4">
        <Typography variant="h4" className="text-indigo-600">
          {title}
        </Typography>
      </div>

      <div className="px-4 md:px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <Products products={products} />
      </div>
    </section>
  );
};

export default CategorySection;
