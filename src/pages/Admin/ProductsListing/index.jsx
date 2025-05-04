import React, { useEffect, useState } from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductsListing = () => {
  const [products, setProducts] = useState([]);
  const userData = useSelector((state) => state?.auth);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/admin/products", {
        headers: {
          Authorization: `Bearer ${userData?.token}`, // Assuming token is stored in localStorage
        },
      });
      setProducts(res.data.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(`http://localhost:4000/api/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${userData?.token}`, // Assuming token is stored in localStorage
        },
      });
      toast.success("Product deleted");
      fetchProducts(); // Refresh list
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product");
    }
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Products Listing
        </Typography>
        <div className="overflow-scroll md:w-full w-[300px]">
          <table className="w-full overflow-scroll text-left">
            <thead>
              <tr>
                {["Name", "Category", "Price", "Status", "Actions"].map(
                  (head) => (
                    <th
                      key={head}
                      className="p-4 border-b border-blue-gray-100 bg-blue-gray-50"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {head}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <tr
                  key={product.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-4">{product.title}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">{product.price}</td>
                  {/* <td className="p-4">{product.stock}</td> */}
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 flex flex-col sm:flex-row gap-2">
                    <Button
                      size="sm"
                      color="blue"
                      className="mr-2"
                      onClick={() =>
                        navigate(`/admin/products/view/${product?._id}`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      color="red"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductsListing;
