import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Radio,
  Button,
} from "@material-tailwind/react";

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleSelect = (value) => {
    setSelectedMethod(value);
  };

  const handleContinue = () => {
    if (!selectedMethod) {
      alert("Please select a payment method.");
      return;
    }
    // Handle redirect or process step
    console.log("Selected Payment Method:", selectedMethod);
    alert(`You selected ${selectedMethod} payment.`);
  };

  const methods = [
    {
      label: "PayPal",
      value: "paypal",
      description: "Fast and secure checkout using your PayPal account.",
    },
    {
      label: "Debit/Credit Card",
      value: "card",
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
