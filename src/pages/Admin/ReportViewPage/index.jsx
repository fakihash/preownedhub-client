import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ReportViewPage = () => {
  const { id } = useParams(); // report ID
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state?.auth);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/admin/reports/${id}`,
          {
            headers: {
              Authorization: `Bearer ${userData?.token}`, // Assuming token is stored in localStorage
            },
          }
        );
        setReport(res.data);
      } catch (err) {
        console.error("Failed to load report", err);
        toast.error("Failed to get data");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  const handleDeleteProduct = async () => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(
        `http://localhost:4000/api/admin/products/${report.productId._id}`,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );
      toast.success("Product deleted successfully.");
      navigate("/admin/reports");
    } catch (err) {
      console.error("Failed to delete product", err);
      toast.error("Error deleting product.");
    }
  };

  if (loading) return <p className="p-4">Loading report...</p>;
  if (!report) return <p className="p-4">Report not found</p>;

  const { productId: product, reason } = report;
  const listedBy = product?.listedBy;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Typography variant="h4" className="mb-4">
        Report Details
      </Typography>

      <Card className="p-4 mb-6">
        <Typography variant="h6">Reason:</Typography>
        <Typography>{reason}</Typography>
      </Card>

      <Card className="p-4 mb-6">
        <Typography variant="h6">Product Info</Typography>
        <Typography>Name: {product.name}</Typography>
        <Typography>Price: ${product.price}</Typography>
        <Typography>Condition: {product.condition}</Typography>
        <Typography className="mt-2">Images:</Typography>
        <div className="flex flex-wrap gap-2 mt-2">
          {product.images?.map((img, i) => (
            <img
              key={i}
              src={`http://localhost:4000/${img}`}
              alt="product"
              className="h-20 rounded"
            />
          ))}
        </div>
      </Card>

      <Card className="p-4 mb-6">
        <Typography variant="h6">Listed By</Typography>
        <Typography>Name: {listedBy?.name}</Typography>
        <Typography>Email: {listedBy?.email}</Typography>
      </Card>

      <Button color="red" onClick={handleDeleteProduct}>
        Delete Product
      </Button>
    </div>
  );
};

export default ReportViewPage;
