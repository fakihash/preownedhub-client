import React, { useEffect, useState } from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UsersListing = () => {
  const userData = useSelector((state) => state?.auth);
  const [users, setUsers] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`, // Assuming token is stored in localStorage
          },
        }
      );
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refetch]);

  const deleteUser = async (id) => {
    console.log(id, "id deltet");
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`, // Assuming token is stored in localStorage
          },
        }
      );
      if (response.status === 200) {
        toast.success("Delete successfully");
        setRefetch(!refetch);
      }
    } catch (error) {
      console.error("Error deleting users:", error);
      toast.error("Failed to deleting users.");
    }
  };

  return (
    <Card className="overflow-hidden w-full">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Users Listing
        </Typography>
        <div className=" overflow-scroll md:w-full w-[300px]">
          <table className="w-full overflow-scroll text-left">
            <thead>
              <tr>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                  >
                    Name
                  </Typography>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                  >
                    Email
                  </Typography>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                  >
                    Role
                  </Typography>
                </th>
                {/* <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold"
                >
                  Status
                </Typography>
              </th> */}
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                  >
                    Actions
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr
                  key={user.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-4">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.role}</td>
                  {/* <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium 
                    ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td> */}
                  <td className="p-4 flex flex-col sm:flex-row gap-2">
                    <Button
                      onClick={() => navigate(`/admin/users/view/${user?._id}`)}
                      size="sm"
                      color="blue"
                      className="mr-2"
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      color="red"
                      onClick={() => deleteUser(user?._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default UsersListing;
