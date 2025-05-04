import React from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input, Textarea, Button, Typography } from "@material-tailwind/react";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const ReportProduct = () => {
  const { id } = useParams();

  const ReportSchema = Yup.object().shape({
    reason: Yup.string().required("Reason is required"),
    details: Yup.string()
      .min(10, "Details too short")
      .required("Details required"),
    email: Yup.string().email("Invalid email").required("Email required"),
  });

  return (
    <div className="bg-gray-100 min-h-screen px-6 py-6">
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
        <Typography variant="h4" color="blue-gray" className="mb-4">
          Report This Product
        </Typography>

        <Formik
          initialValues={{ reason: "", details: "", email: "" }}
          validationSchema={ReportSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              await axios.post(`http://localhost:4000/api/product/report`, {
                ...values,
                // reportedBy: userData?.id,
                productId: id,
              });
              toast.success("Report submitted successfully!");
              resetForm();
            } catch (err) {
              console.log(err);
              toast.error("Something went wrong");
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <Field
                  as={Input}
                  name="reason"
                  label="Reason (e.g., Scam, Wrong Info)"
                  error={touched.reason && errors.reason}
                />
                <ErrorMessage
                  name="reason"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  as={Textarea}
                  name="details"
                  label="More Details"
                  rows={5}
                  error={touched.details && errors.details}
                />
                <ErrorMessage
                  name="details"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  as={Input}
                  name="email"
                  type="email"
                  label="Your Email (for verification)"
                  error={touched.email && errors.email}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <Button type="submit" color="red">
                Submit Report
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ReportProduct;
