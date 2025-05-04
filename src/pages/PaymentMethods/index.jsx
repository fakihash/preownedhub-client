import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Radio,
  Button,
  Textarea,
  Input,
} from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const PaymentMethods = () => {
  const { state } = useLocation();
  const { userId, productId, price } = state;
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("");
  const userData = useSelector((state) => state?.auth);
  const [billingName, setBillingName] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const handleSelect = (value) => {
    setSelectedMethod(value);
  };

  const handleContinue = async () => {
    if (!selectedMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (selectedMethod === "cash") {
      if (!billingName || !billingEmail || !billingAddress) {
        alert("Please fill all required billing information.");
        return;
      }
    }

    try {
      let body;
      if (selectedMethod === "stripe") {
        body = {
          user: userId,
          products: [{ product: productId, quantity: 1 }],
          totalAmount: price,
          paymentMethod: selectedMethod,
        };
      } else {
        body = {
          user: userId,
          products: [{ product: productId, quantity: 1 }],
          totalAmount: price,
          paymentMethod: selectedMethod,
          billingInfo: {
            name: billingName,
            email: billingEmail,
            address: billingAddress,
          },
        };
      }
      const response = await axios.post(
        "http://localhost:4000/api/order/create",
        body,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );

      const order = response.data;

      console.log(order, "order response before stripe");

      if (selectedMethod === "stripe") {
        const stripeSession = await axios.post(
          "http://localhost:4000/api/order/stripe/create-session",
          {
            orderId: order._id,
          }
        );
        window.location.href = stripeSession.data.url;
      } else {
        if (selectedMethod === "cash") {
          alert("Your order has been placed with Cash on Delivery!");
          // navigate("/payment-success?orderId=" + response.data._id);
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Order creation failed", error);
      alert("Something went wrong.");
    }
  };

  const methods = [
    // {
    //   label: "PayPal",
    //   value: "paypal",
    //   description: "Fast and secure checkout using your PayPal account.",
    // },
    {
      label: "Debit/Credit Card",
      value: "stripe",
      description: "Pay using your Visa, MasterCard, or other cards.",
    },
    {
      label: "Cash on Delivery",
      value: "cash",
      description: "Pay in cash when the product is delivered.",
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col gap-6">
      <Typography variant="h4" color="blue-gray">
        Select Payment Method
      </Typography>

      <div className="space-y-4">
        {methods.map((method) => (
          <Card
            key={method.value}
            className={`border cursor-pointer transition-all ${
              selectedMethod === method.value
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => handleSelect(method.value)}
          >
            <CardBody className="flex items-start gap-4">
              <Radio
                name="payment"
                value={method.value}
                checked={selectedMethod === method.value}
                onChange={() => handleSelect(method.value)}
                ripple={false}
              />
              <div>
                <Typography variant="h6">{method.label}</Typography>
                <Typography className="text-sm text-gray-600">
                  {method.description}
                </Typography>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="p-4 flex bg-white rounded-xl">
        {selectedMethod === "cash" && (
          <div className="space-y-6 mt-6 w-full">
            <Typography variant="h4">Billing Information</Typography>
            <div className="w-full">
              <Input
                label="Full Name"
                value={billingName}
                onChange={(e) => setBillingName(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <Input
                label="Email Address"
                type="email"
                value={billingEmail}
                onChange={(e) => setBillingEmail(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <Textarea
                label="Billing / Delivery Address"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                required
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <Button
          color="blue"
          fullWidth
          onClick={handleContinue}
          disabled={!selectedMethod}
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethods;
