import React, { useEffect, useState } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import ProductCard from "../ProductCard";

const CategorySection = () => {
  const [products, setProducts] = useState({});

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/product/allGroup`
      );
      if (response.status === 200) {
        console.log(response?.data, "response all group products");
        setProducts(response.data.products || {});
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch your products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const limitedCategories = Object.entries(products).slice(0, 3); // Only 3 categories

  return (
    <section className="mb-10 space-y-8">
      {limitedCategories.map(([category, items]) => (
        <div key={category}>
          <Typography variant="h4" className="text-indigo-600 mb-3">
            {category}
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {items.slice(0, 3).map(
              (
                product // Only 3 products per category
              ) => (
                <ProductCard key={product._id} product={product} />
              )
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default CategorySection;
