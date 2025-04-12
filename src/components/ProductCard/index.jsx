import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import React from "react";

const ProductCard = ({ index, product }) => {
  return (
    <Card
      key={index}
      className="w-full max-w-[26rem] shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <CardHeader floated={false} className="relative h-52">
        <div className="w-full h-full">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-black/60" />
      </CardHeader>

      <CardBody>
        <div className="flex justify-end">
          <IconButton
            size="sm"
            color="red"
            variant="text"
            className=" rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </IconButton>
        </div>
        <div className="flex items-center justify-between mb-2">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            {product.title}
          </Typography>

          <Typography color="blue-gray" className="font-bold text-lg">
            ${product.price}
          </Typography>
        </div>
        <Typography color="gray" className="text-sm">
          {product.description ||
            "High-quality product with premium materials."}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
