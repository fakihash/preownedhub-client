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

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [removedImages, setRemovedImages] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageError, setImageError] = useState(""); // for handling custom image error

  // Fetch product by ID
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/product/${id}`);
      setProduct(res.data.product);
      setProductImages(res.data.product?.images);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch product details.");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Form validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    category: Yup.string().required("Category is required"),
    condition: Yup.string().required("Condition is required"),
  });

  const handleSubmit = async (values) => {
    try {
      await axios.put(`http://localhost:4000/api/product/update/${id}`, values);
      toast.success("Product updated successfully!");
      navigate("/my-products"); // Redirect after success
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update product.");
    }
  };

  if (!product) {
    return <div>Loading...</div>; // Show loading state while fetching the product
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (selectedImages.length + files.length > 5) {
      setImageError("You can upload maximum 5 images only.");
      return;
    }

    setSelectedImages((prev) => [...prev, ...files]);
    setImageError(""); // clear error on successful upload
  };

  const removeImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);

    // Clear error if now valid
    if (newImages.length >= 2 && newImages.length <= 5) {
      setImageError("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-gray-800">
          Edit Product
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
          onSubmit={async (values) => {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("price", values.price);
            formData.append("category", values.category);
            formData.append("condition", values.condition);
            formData.append("status", values.status);
            formData.append("removedImages", JSON.stringify(removedImages));

            for (let i = 0; i < selectedImages.length; i++) {
              formData.append("images", selectedImages[i]);
            }

            try {
              await axios.put(
                `http://localhost:4000/api/product/update/${id}`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              toast.success("Product updated successfully!");
              navigate("/product/list");
            } catch (err) {
              console.error(err);
              toast.error(
                err.response?.data?.message || "Failed to update product."
              );
            }
          }}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-blue-gray-700 mb-1">
                  Title
                </label>
                <Field
                  as={Input}
                  name="title"
                  size="lg"
                  label="Product Title"
                  className="!border-blue-gray-200 focus:!border-indigo-600"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-gray-700 mb-1">
                  Description
                </label>
                <Field
                  as={Textarea}
                  name="description"
                  label="Product Description"
                  className="!border-blue-gray-200 focus:!border-indigo-600"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-gray-700 mb-1">
                    Price
                  </label>
                  <Field
                    as={Input}
                    name="price"
                    type="number"
                    size="lg"
                    label="Product Price"
                    className="!border-blue-gray-200 focus:!border-indigo-600"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-gray-700 mb-1">
                    Category
                  </label>
                  <Field
                    as={Input}
                    name="category"
                    size="lg"
                    label="Product Category"
                    className="!border-blue-gray-200 focus:!border-indigo-600"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-gray-700 mb-1">
                  Condition
                </label>
                <Select
                  label="Select Condition"
                  value={product.condition}
                  onChange={(val) => setFieldValue("condition", val)}
                  className="!border-blue-gray-200 focus:!border-indigo-600"
                >
                  <Option value="new">New</Option>
                  <Option value="like new">Like New</Option>
                  <Option value="used">Used</Option>
                  <Option value="good">Good</Option>
                  <Option value="fair">Fair</Option>
                  <Option value="poor">Poor</Option>
                </Select>
                <ErrorMessage
                  name="condition"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-gray-700 mb-1">
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
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                {product.images
                  ?.filter((img) => !removedImages.includes(img))
                  ?.map((img, idx) => (
                    <div key={idx} className="relative w-24 h-24">
                      <img
                        src={`http://localhost:4000/${img}`}
                        alt={`product-${idx}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setRemovedImages((prev) => [...prev, img])
                        }
                        className="absolute top-0 right-0 text-red-500 bg-black flex-shrink-0 size-7 flex items-center justify-center rounded-full p-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-gray-700 mb-2">
                  Upload Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="block w-full text-sm text-slate-500
                               file:mr-4 file:py-2 file:px-4
                               file:rounded-full file:border-0
                               file:text-sm file:font-semibold
                               file:bg-indigo-50 file:text-indigo-700
                               hover:file:bg-indigo-100"
                />

                {imageError && (
                  <div className="text-red-500 text-sm mt-2">{imageError}</div>
                )}

                {selectedImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedImages.map((file, index) => (
                      <Chip
                        key={index}
                        value={file.name}
                        onClose={() => removeImage(index)}
                        className="bg-indigo-100 text-indigo-700"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Image upload feature can be added here */}

              <Button
                type="submit"
                size="lg"
                className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold"
              >
                Update Product
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProduct;
