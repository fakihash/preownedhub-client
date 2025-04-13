import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
} from "@material-tailwind/react";

const ProductDetail = ({ product }) => {
  // Example product if not passed as prop (fallback for testing)
  product = product || {
    title: "Smartphone",
    price: 199,
    description:
      "High-quality smartphone with premium build and excellent performance.",
    category: "electronics",
    brand: "Samsung",
    image: "https://via.placeholder.com/500x300",
    seller: {
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-6 gap-6 bg-gray-100">
      {/* Product Image & Details */}
      <Card className="lg:w-2/3 w-full shadow-lg">
        <CardHeader floated={false} className="h-80">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center justify-between">
            <Typography variant="h4" color="blue-gray">
              {product.title}
            </Typography>
            <Chip value={`$${product.price}`} color="green" size="lg" />
          </div>

          <div className="flex gap-4 text-sm text-gray-600">
            <span className="bg-blue-gray-50 px-2 py-1 rounded">
              Brand: {product.brand}
            </span>
            <span className="bg-blue-gray-50 px-2 py-1 rounded">
              Category: {product.category}
            </span>
          </div>

          <Typography color="gray">{product.description}</Typography>

          <Button color="blue">Buy Now</Button>
        </CardBody>
      </Card>

      {/* Seller Info */}
      <Card className="lg:w-1/3 w-full shadow-lg">
        <CardBody className="flex flex-col items-center text-center space-y-4">
          <Avatar
            src={product.seller.avatar}
            size="xl"
            alt="seller-avatar"
            className="shadow-lg"
          />
          <Typography variant="h5" color="blue-gray">
            {product.seller.name}
          </Typography>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Email: {product.seller.email}</p>
            <p>Phone: {product.seller.phone}</p>
          </div>
          <Button variant="outlined" color="blue">
            Contact Seller
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductDetail;
