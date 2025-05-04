import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Typography, Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/admin/profile/${id}`
        );
        setUser(res.data);
      } catch (err) {
        toast.error("Failed to fetch user details");
      }
    };
    fetchUser();
  }, [id]);

  if (!user) return <p className="p-10">Loading user details...</p>;

  return (
    <div className="p-10">
      <Typography variant="h4" className="mb-6">
        User Details
      </Typography>
      <Card className="p-6 space-y-4 max-w-xl">
        <Typography>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </Typography>
        <Typography>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography>
          <strong>Phone:</strong> {user.phone}
        </Typography>
        <Typography>
          <strong>Address:</strong> {user.address}
        </Typography>
        <Typography>
          <strong>Role:</strong> {user.role}
        </Typography>
        <Button
          variant="outlined"
          color="blue"
          as={Link}
          onClick={() => navigate("/admin/users")}
        >
          Back to List
        </Button>
      </Card>
    </div>
  );
};

export default ViewUser;
