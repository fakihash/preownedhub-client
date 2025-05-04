import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const { id } = useParams();
  const userData = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  console.log(userData, "usr data");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/product/${id}`);
        if (res.status === 200) {
          setProduct(res.data.product);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-6 gap-6 bg-gray-100">
      {/* Product Image & Details */}
      <Card className="lg:w-2/3 w-full shadow-lg">
        {product.images && product.images.length > 0 && (
          <CardHeader floated={false} className="h-80">
            <img
              src={`http://localhost:4000/${product.images[0]}`} // showing the first image
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </CardHeader>
        )}
        <CardBody className="space-y-4">
          <div className="flex items-center justify-between">
            <Typography variant="h4" color="blue-gray">
              {product?.title}
            </Typography>
            <Chip value={`$${product?.price}`} color="green" size="lg" />
          </div>

          <div className="flex gap-4 text-sm text-gray-600">
            <span className="bg-blue-gray-50 px-2 py-1 rounded">
              Title: {product.title}
            </span>
            <span className="bg-blue-gray-50 px-2 py-1 rounded">
              Category: {product.category}
            </span>
          </div>

          <Typography color="gray">{product.description}</Typography>
          <div className="flex flex-col items-start gap-2">
            <Button
              color="blue"
              onClick={() => {
                if (userData?.isLoggedIn) {
                  navigate("/payment", {
                    state: {
                      userId: product?.listedBy?._id,
                      productId: product?._id,
                      price: product.price,
                    },
                  });
                } else {
                  alert("Need to login first");
                }
              }}
            >
              Buy Now
            </Button>
            <Button
              variant="text"
              color="red"
              onClick={() => {
                if (userData?.isLoggedIn) {
                  navigate(`/report/${product._id}`);
                } else {
                  alert("Need to login first");
                }
              }}
              className="text-sm underline"
            >
              Report
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card className="lg:w-1/3 w-full shadow-lg">
        <CardBody className="flex flex-col items-center text-center space-y-4">
          <Avatar
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${product?.listedBy?.firstName} ${product?.listedBy?.lastName}`}
            size="xl"
            alt="seller-avatar"
            className="shadow-lg"
          ></Avatar>

          <Typography variant="h5" color="blue-gray">
            {product?.listedBy?.firstName}
          </Typography>

          <div className="space-y-1 text-sm text-gray-600">
            <p>Email: {product?.listedBy?.email}</p>
            <p>Phone: {product?.listedBy?.phone}</p>
          </div>
          {/* <Button variant="outlined" color="blue">
            Contact Seller
          </Button> */}
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductDetail;
