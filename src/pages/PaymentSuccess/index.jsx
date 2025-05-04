// src/pages/PaymentSuccess.jsx
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (orderId) {
      const updateStatusOrder = async () => {
        try {
          const response = await axios.put(
            `http://localhost:4000/api/order/mark-paid/${orderId}`
          );
          if (response.status === 200) {
            console.log("order updated");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      };
      updateStatusOrder();
    }
  }, [orderId]);

  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-lg">
        Thank you for your purchase. Your order has been placed.
      </p>
    </div>
  );
};

export default PaymentSuccess;
