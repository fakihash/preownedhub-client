import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/toastService";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const userData = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageError, setImageError] = useState(""); // for handling custom image error

  const categories = [
    "Electronics",
    "Furniture",
    "Clothing",
    "Books",
    "Vehicles",
    "Sports",
    "Other",
  ];

  const initialValues = {
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    category: Yup.string().required("Category is required"),
    condition: Yup.string().required("Condition is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    if (selectedImages.length < 2) {
      setImageError("Please upload at least 2 images.");
      return;
    }
    if (selectedImages.length > 5) {
      setImageError("You can upload maximum 5 images only.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("category", values.category);
      formData.append("condition", values.condition);

      for (let i = 0; i < selectedImages.length; i++) {
        formData.append("images", selectedImages[i]);
      }

      const response = await axios.post(
        "http://localhost:4000/api/product/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );

      if (response?.status === 201) {
        showToast.success("Product listed successfully!");
        resetForm();
        setSelectedImages([]);
        setImageError("");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      showToast.error(err.response?.data?.message || "Failed to list product");
    }
  };

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
          List a Product
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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
                  <Select
                    label="Select Category"
                    onChange={(val) => setFieldValue("category", val)}
                    className="!border-blue-gray-200 focus:!border-indigo-600"
                  >
                    {categories.map((cat, idx) => (
                      <Option key={idx} value={cat}>
                        {cat}
                      </Option>
                    ))}
                  </Select>
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

              {/* Images Upload */}
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

              <Button
                type="submit"
                size="lg"
                className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold"
              >
                List Now
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProduct;
