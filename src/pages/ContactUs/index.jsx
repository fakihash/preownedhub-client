import React from "react";
import { Input, Textarea, Button, Typography } from "@material-tailwind/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema using Yup
// Add phone validation to your schema
const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  message: Yup.string()
    .min(10, "Message is too short")
    .required("Message is required"),
});

const ContactUs = () => {
  return (
    <div className="min-h-screen px-6 py-12 bg-gray-100">
      <div className="max-w-3xl mx-auto">
        <Typography variant="h3" color="blue-gray" className="text-center mb-6">
          Contact Us
        </Typography>

        <Formik
          initialValues={{ name: "", email: "", message: "", phone: "" }}
          validationSchema={ContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log("Form submitted:", values);
            alert("Thanks for contacting us!");
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-6 bg-gray-50 p-6 rounded-lg shadow-md">
              {/* Name */}
              <div>
                <Field
                  as={Input}
                  label="Name"
                  name="name"
                  error={touched.name && errors.name ? true : false}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <Field
                  as={Input}
                  label="Email"
                  name="email"
                  type="email"
                  error={touched.email && errors.email ? true : false}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <Field
                  as={Input}
                  label="Phone"
                  name="phone"
                  type="text"
                  error={touched.phone && errors.phone ? true : false}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              {/* Message */}
              <div>
                <Field
                  as={Textarea}
                  name="message"
                  label="Your Message"
                  rows={6}
                  error={touched.message && errors.message ? true : false}
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" color="blue">
                Send Message
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactUs;
