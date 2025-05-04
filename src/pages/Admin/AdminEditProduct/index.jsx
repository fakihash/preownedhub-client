import React, { useEffect, useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Select,
  Option,
  Chip,
} from "@material-tailwind/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminEditProduct = () => {
  const userData = useSelector((state) => state?.auth);

  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [removedImages, setRemovedImages] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/admin/product/${id}`,
          {
            headers: {
              Authorization: `Bearer ${userData?.token}`, // Assuming token is stored in localStorage
            },
          }
        );
        setProduct(res.data.product);
        setProductImages(res.data.product?.images);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch product details.");
      }
    };

    fetchProduct();
  }, [id]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required").positive(),
    category: Yup.string().required("Category is required"),
    condition: Yup.string().required("Condition is required"),
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (selectedImages.length + files.length > 5) {
      setImageError("You can upload maximum 5 images only.");
      return;
    }

    setSelectedImages((prev) => [...prev, ...files]);
    setImageError("");
  };

  const removeImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);

    if (newImages.length <= 5) {
      setImageError("");
    }
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    formData.append("removedImages", JSON.stringify(removedImages));
    selectedImages.forEach((img) => formData.append("images", img));

    try {
      await axios.put(
        `http://localhost:4000/api/admin/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );
      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update product.");
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Admin Edit Product
        </h2>

        <Formik
          initialValues={{
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            condition: product.condition,
            status: product.status || "available",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-6">
              {/* Fields for title, description, price, etc. same as user version */}
              <FieldWrapper
                name="title"
                label="Product Title"
                component={Input}
              />
              <FieldWrapper
                name="description"
                label="Product Description"
                component={Textarea}
              />
              <div className="grid grid-cols-2 gap-4">
                <FieldWrapper
                  name="price"
                  label="Price"
                  component={Input}
                  type="number"
                />
                <FieldWrapper
                  name="category"
                  label="Category"
                  component={Input}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Condition
                </label>
                <Select
                  label="Condition"
                  value={product.condition}
                  onChange={(val) => setFieldValue("condition", val)}
                >
                  {["new", "like new", "used", "good", "fair", "poor"].map(
                    (opt) => (
                      <Option key={opt} value={opt}>
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </Option>
                    )
                  )}
                </Select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Status
                </label>
                <Select
                  label="Status"
                  value={product.status}
                  onChange={(val) => setFieldValue("status", val)}
                >
                  <Option value="available">Available</Option>
                  <Option value="sold">Sold</Option>
                </Select>
              </div>

              {/* Existing images */}
              <div className="flex gap-4 flex-wrap">
                {productImages
                  ?.filter((img) => !removedImages.includes(img))
                  ?.map((img, idx) => (
                    <div key={idx} className="relative w-24 h-24">
                      <img
                        src={`http://localhost:4000/${img}`}
                        alt={`preview-${idx}`}
                        className="w-full h-full object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setRemovedImages((prev) => [...prev, img])
                        }
                        className="absolute top-0 right-0 bg-black text-white text-xs px-1 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
              </div>

              {/* Upload input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 file:rounded-full file:px-4 file:py-2"
                />
                {imageError && (
                  <p className="text-red-500 text-sm mt-1">{imageError}</p>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedImages.map((file, idx) => (
                    <Chip
                      key={idx}
                      value={file.name}
                      onClose={() => removeImage(idx)}
                      className="bg-indigo-100 text-indigo-700"
                    />
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full bg-indigo-600 text-white">
                Update Product
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

// Reusable FieldWrapper component
const FieldWrapper = ({ name, label, component: Component, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <Field
      as={Component}
      name={name}
      type={type}
      label={label}
      className="!border-blue-gray-200 focus:!border-indigo-600"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm"
    />
  </div>
);

export default AdminEditProduct;
