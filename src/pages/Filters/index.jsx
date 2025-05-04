import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Select,
  Option,
  Typography,
  Card,
  CardBody,
} from "@material-tailwind/react";
import { ProductCard } from "../../components";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Filters = () => {
  const location = useLocation();

  const getInitialFilters = () => {
    const params = new URLSearchParams(location.search);
    return {
      category: params.get("category") || params.get("search") || "",
      priceRange: "",
      brand: "",
      condition: "",
      name: params.get("search") || "",
    };
  };

  const [selectedFilters, setSelectedFilters] = useState(getInitialFilters());
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const params = {};

      if (selectedFilters.category) params.category = selectedFilters.category;
      if (selectedFilters.brand) params.brand = selectedFilters.brand;
      if (selectedFilters.name) params.name = selectedFilters.name;
      if (selectedFilters.condition)
        params.condition = selectedFilters.condition;
      if (selectedFilters.minPrice) params.minPrice = selectedFilters.minPrice;
      if (selectedFilters.maxPrice) params.maxPrice = selectedFilters.maxPrice;

      try {
        const res = await axios.get(
          "http://localhost:4000/api/product/filter",
          { params }
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch filtered products", err);
      }
    };

    fetchFilteredProducts();
  }, [selectedFilters]);

  const handleFilterChange = (key, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      category: "",
      priceRange: "",
      brand: "",
      condition: "",
      name: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-4 gap-6 bg-gray-100">
      {/* Filters Section */}
      <Card className="w-full lg:w-1/4 p-4">
        <CardBody className="space-y-6">
          <Typography variant="h5" color="blue-gray">
            Filters
          </Typography>

          <div>
            <Typography variant="small" className="mb-1">
              Category
            </Typography>
            <Select
              label="Select category"
              value={selectedFilters.category}
              onChange={(val) => handleFilterChange("category", val)}
            >
              <Option value="">All</Option>
              <Option value="Electronics">Electronics</Option>
              <Option value="Clothing">Clothing</Option>
              <Option value="books">Books</Option>
            </Select>
          </div>

          <div>
            <Typography variant="small" className="mb-1">
              Price Range
            </Typography>
            <div className="flex flex-col gap-2">
              <Input
                label="Min Price"
                type="number"
                value={selectedFilters.minPrice || ""}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              />
              <Input
                label="Max Price"
                type="number"
                value={selectedFilters.maxPrice || ""}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Typography variant="small" className="mb-1">
              Condition
            </Typography>
            <Select
              label="Select condition"
              value={selectedFilters.condition}
              onChange={(val) => handleFilterChange("condition", val)}
            >
              <Option value="">All</Option>
              <Option value="new">New</Option>
              <Option value="used">Used</Option>
            </Select>
          </div>

          <div>
            <Typography variant="small" className="mb-1">
              Product Name
            </Typography>
            <Input
              label="Enter product name"
              value={selectedFilters.name || ""}
              onChange={(e) => handleFilterChange("name", e.target.value)}
            />
          </div>

          <Button color="red" fullWidth onClick={clearFilters} className="mt-2">
            Clear All
          </Button>
        </CardBody>
      </Card>

      {/* Product Section */}
      <Card className="w-full lg:w-3/4 p-4">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-4">
            Selected Filters
          </Typography>
          <ul className="space-y-2 text-sm mb-6">
            <li>Category: {selectedFilters.category || "All"}</li>
            <li>
              Price Range:{" "}
              {selectedFilters.minPrice || selectedFilters.maxPrice
                ? `${selectedFilters.minPrice || 0} - ${
                    selectedFilters.maxPrice || "∞"
                  }`
                : "All"}
            </li>
            <li>Condition: {selectedFilters.condition || "Any"}</li>
            <li>Product Name: {selectedFilters.name || "Any"}</li>
          </ul>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product, index) => (
                <ProductCard key={index} index={index} product={product} />
              ))
            ) : (
              <Typography variant="h6" color="gray">
                No products match the selected filters.
              </Typography>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Filters;
