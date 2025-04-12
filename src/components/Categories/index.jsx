import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categoryData = [
  {
    name: "Electronics",
    products: ["iPhone 12", "Smart TV", "Laptop"],
  },
  {
    name: "Furniture",
    products: ["Sofa Set", "Dining Table", "Bookshelf"],
  },
  {
    name: "Books",
    products: ["Atomic Habits", "Harry Potter", "Deep Work"],
  },
  {
    name: "Fashion",
    products: ["Men's Jacket", "Sneakers", "Watches"],
  },
  {
    name: "Vehicles",
    products: ["Car", "Bike", "Scooter"],
  },
  {
    name: "Appliances",
    products: ["Microwave", "Refrigerator", "Washing Machine"],
  },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category.toLowerCase()}`);
  };

  return (
    <div>
      <Menu placement="bottom-start">
        <MenuHandler>
          <Button
            variant="outlined"
            className="flex items-center gap-2 border-gray-300 text-gray-800"
          >
            Categories <ChevronDown className="h-4 w-4" />
          </Button>
        </MenuHandler>

        <MenuList className="min-w-[320px] md:min-w-[500px] p-4 z-[100] grid gap-4 grid-cols-4">
          {categoryData?.map((cat) => (
            <MenuItem
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className="flex flex-col items-start hover:bg-gray-50"
            >
              <Typography variant="h6" className="capitalize text-indigo-600">
                {cat.name}
              </Typography>
              <ul className="ml-2 mt-1 text-sm text-gray-600 list-disc space-y-1">
                {cat.products.slice(0, 3).map((prod) => (
                  <li key={prod}>{prod}</li>
                ))}
              </ul>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default Categories;
