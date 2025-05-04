import React, { useEffect, useState } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import {
  Users,
  UserCheck,
  UserCog,
  PackageCheck,
  ShoppingCart,
} from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Dashboard = () => {
  const userData = useSelector((state) => state?.auth);
  const [stats, setStats] = useState([]);

  console.log(userData, "user data");

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response, "response");
        const { userCount, productCount, reportCount, orderCount } =
          response.data.data;
        console.log(orderCount, "order counts");
        setStats([
          {
            title: "Total Users",
            value: userCount,
            icon: <Users className="h-6 w-6 text-blue-500" />,
            color: "blue",
          },
          {
            title: "Total Products",
            value: productCount,
            icon: <PackageCheck className="h-6 w-6 text-orange-500" />,
            color: "orange",
          },
          {
            title: "Total Reports",
            value: reportCount,
            icon: <UserCog className="h-6 w-6 text-red-500" />,
            color: "red",
          },
          {
            title: "Total Orders",
            value: orderCount,
            icon: <ShoppingCart className="h-6 w-6 text-green-500" />,
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch your dashboard data.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <Card key={idx} className="p-4 shadow-md">
          <CardBody className="flex items-center gap-4">
            <div className="rounded-full bg-gray-100 p-3">{stat.icon}</div>
            <div>
              <Typography variant="small" color="gray" className="font-medium">
                {stat.title}
              </Typography>
              <Typography variant="h5" color="blue-gray">
                {stat.value}
              </Typography>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;
