import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const ReportsListing = () => {
  const [reports, setReports] = useState([]);
  const userData = useSelector((state) => state?.auth);
  const navigate = useNavigate();

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/admin/reports", {
        headers: {
          Authorization: `Bearer ${userData?.token}`, // Assuming token is stored in localStorage
        },
      });
      console.log(res, "response api");
      setReports(res.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Failed to load reports");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  console.log(reports, "reports");

  return (
    <Card className="overflow-auto w-full">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Product Fraud Reports
        </Typography>
        <div className="overflow-scroll md:w-full w-[300px]">
          <table className="w-full overflow-scroll table-auto text-left">
            <thead>
              <tr>
                {[
                  "Product",
                  "Reporter Email",
                  "Reason",
                  "Reported On",
                  "Action",
                ].map((head) => (
                  <th
                    key={head}
                    className="p-4 border-b border-blue-gray-100 bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => {
                let dateValue = dayjs(report.reportedAt).format("YYYY-MM-DD");
                return (
                  <tr
                    key={report.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-4">{report.productId?.title}</td>
                    <td className="p-4">{report.email}</td>
                    <td className="p-4">{report.reason}</td>
                    <td className="p-4">{dateValue}</td>
                    <td className="p-4 space-x-2">
                      <Tooltip content="View Product">
                        <Button
                          size="sm"
                          color="blue"
                          onClick={() =>
                            navigate(`/admin/reports/view/${report?._id}`)
                          }
                        >
                          View
                        </Button>
                      </Tooltip>
                      {/* <Tooltip content="Remove Product">
                      <Button size="sm" color="red">
                        Remove
                      </Button>
                    </Tooltip> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default ReportsListing;
