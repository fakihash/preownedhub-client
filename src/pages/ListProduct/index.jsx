import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ListProducts = () => {
  const userData = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [refetch, setRefetch] = useState(false);

  console.log(userData, "user data");

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/product/mylist`,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );
      if (response.status === 200) {
        setProducts(response.data.product || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch your products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refetch]);

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/product/delete/${id}`
      );
      if (response.status === 200) {
        toast.success("Product Deleted Successfully!");
        setRefetch(!refetch);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch your products.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="md:text-xl text-base font-bold text-blue-gray-800">
            My Product Listings
          </h2>
          <Button
            size="md"
            className="bg-indigo-600 hover:bg-indigo-700 transition"
            onClick={() => navigate("/product/add")}
          >
            Add New Product
          </Button>
        </div>

        {/* Products Section */}
        {products.length === 0 ? (
          <div className="text-center text-blue-gray-700 mt-20">
            <Typography variant="h5">
              You have not listed any products yet.
            </Typography>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product._id} className="shadow-md">
                {product.images && product.images.length > 0 && (
                  <img
                    src={`http://localhost:4000/${product.images[0]}`} // showing the first image
                    alt={product.title}
                    className="h-48 w-full object-cover rounded-t-md"
                  />
                )}
                <CardBody>
                  <Typography variant="h6" className="mb-2">
                    {product.title}
                  </Typography>
                  <Typography className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </Typography>
                  <Typography className="text-indigo-600 font-bold mt-2">
                    ${product.price}
                  </Typography>
                  <Typography className="text-sm text-blue-gray-500">
                    {product.category} • {product.condition}
                  </Typography>
                </CardBody>
                <CardFooter className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outlined"
                    className="border-red-700 text-red-600 hover:bg-red-200"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    size="sm"
                    variant="outlined"
                    className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                    onClick={() => navigate(`/product/edit/${product._id}`)}
                  >
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProducts;
