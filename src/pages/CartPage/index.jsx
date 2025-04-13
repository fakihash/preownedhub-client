import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Wireless Headphones",
      price: 59.99,
      image: "https://via.placeholder.com/150",
      quantity: 1,
    },
    {
      id: 2,
      title: "Smart Watch",
      price: 129.99,
      image: "https://via.placeholder.com/150",
      quantity: 2,
    },
  ]);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item
      )
    );
  };

  const getTotal = () =>
    cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);

  return (
    <div className="min-h-screen p-6 bg-gray-100 space-y-6">
      <Typography variant="h4" color="blue-gray">
        Shopping Cart
      </Typography>

      {cartItems.map((item) => (
        <Card
          key={item.id}
          className="flex flex-col md:flex-row items-center gap-6 p-4"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-32 h-32 object-cover rounded-lg"
          />

          <CardBody className="w-full space-y-2">
            <div className="flex justify-between items-center">
              <Typography variant="h5">{item.title}</Typography>
              <Typography color="blue-gray" className="font-semibold text-lg">
                ${item.price}
              </Typography>
            </div>

            <div className="flex items-center gap-4">
              <IconButton onClick={() => handleQuantityChange(item.id, -1)}>
                −
              </IconButton>
              <span className="text-lg font-medium">{item.quantity}</span>
              <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
                +
              </IconButton>
            </div>

            <Typography className="text-sm text-gray-600">
              Total: ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </CardBody>
        </Card>
      ))}

      <Card className="p-4 flex justify-between items-center">
        <Typography variant="h6">Grand Total:</Typography>
        <Typography variant="h5" color="green">
          ${getTotal()}
        </Typography>
      </Card>
    </div>
  );
};

export default CartPage;
