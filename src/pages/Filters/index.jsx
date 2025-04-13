import React, { useMemo, useState } from "react";
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

const products = [
  {
    title: "Smartphone",
    price: 199,
    category: "electronics",
    brand: "Samsung",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "T-Shirt",
    price: 25,
    category: "clothes",
    brand: "Nike",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Laptop",
    price: 899,
    category: "electronics",
    brand: "Dell",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Novel Book",
    price: 15,
    category: "books",
    brand: "Penguin",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Jeans",
    price: 55,
    category: "clothes",
    brand: "Levi's",
    image: "https://via.placeholder.com/300x200",
  },
];

const Filters = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    priceRange: "",
    brand: "",
  });

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
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const { category, priceRange, brand } = selectedFilters;

      const matchesCategory = !category || product.category === category;
      const matchesBrand =
        !brand || product.brand.toLowerCase().includes(brand.toLowerCase());

      let matchesPrice = true;
      if (priceRange) {
        const [min, max] = priceRange.split("-").map(Number);
        matchesPrice = product.price >= min && product.price <= max;
      }

      return matchesCategory && matchesPrice && matchesBrand;
    });
  }, [selectedFilters]);

  return (
    <div className="flex min-h-screen p-6 gap-6 bg-gray-100">
      {/* Left Sidebar */}
      <Card className="w-1/4 p-4">
        <CardBody className="space-y-6">
          <Typography variant="h5" color="blue-gray">
            Filters
          </Typography>

          {/* Category */}
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
              <Option value="electronics">Electronics</Option>
              <Option value="clothes">Clothes</Option>
              <Option value="books">Books</Option>
            </Select>
          </div>

          {/* Price Range */}
          <div>
            <Typography variant="small" className="mb-1">
              Price Range
            </Typography>
            <Select
              label="Select price range"
              value={selectedFilters.priceRange}
              onChange={(val) => handleFilterChange("priceRange", val)}
            >
              <Option value="">All</Option>
              <Option value="0-50">$0 - $50</Option>
              <Option value="51-100">$51 - $100</Option>
              <Option value="101-200">$101 - $200</Option>
            </Select>
          </div>

          {/* Brand */}
          <div>
            <Typography variant="small" className="mb-1">
              Brand
            </Typography>
            <Input
              label="Enter brand"
              value={selectedFilters.brand}
              onChange={(e) => handleFilterChange("brand", e.target.value)}
            />
          </div>

          {/* Clear Button */}
          <Button color="red" fullWidth onClick={clearFilters} className="mt-2">
            Clear All
          </Button>
        </CardBody>
      </Card>

      {/* Right Content */}
      <Card className="w-3/4 p-6">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-4">
            Selected Filters
          </Typography>
          <ul className="space-y-2 text-sm">
            <li>Category: {selectedFilters.category || "All"}</li>
            <li>Price Range: {selectedFilters.priceRange || "All"}</li>
            <li>Brand: {selectedFilters.brand || "Any"}</li>
          </ul>
        </CardBody>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard key={index} index={index} product={product} />
            ))
          ) : (
            <Typography variant="h6" color="gray">
              No products match the selected filters.
            </Typography>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Filters;
