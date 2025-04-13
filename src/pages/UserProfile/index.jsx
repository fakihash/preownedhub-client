import React from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Avatar,
} from "@material-tailwind/react";

const UserProfile = () => {
  // Mock user data — you can replace with actual user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8901",
    address: "123 Main Street, Cityville, USA",
    avatar: "https://i.pravatar.cc/150?img=3", // Placeholder avatar
  };

  const handleEdit = () => {
    // Add navigation or modal for editing
    alert("Edit profile coming soon!");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardBody className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar src={user.avatar} alt={user.name} size="xl" />
            <Typography variant="h5">{user.name}</Typography>
            <Typography className="text-gray-600">{user.email}</Typography>
          </div>

          <div className="space-y-3 mt-6">
            <div>
              <Typography variant="small" className="text-gray-500">
                Phone
              </Typography>
              <Typography>{user.phone}</Typography>
            </div>
            <div>
              <Typography variant="small" className="text-gray-500">
                Address
              </Typography>
              <Typography>{user.address}</Typography>
            </div>
          </div>

          <div className="pt-4">
            <Button color="blue" onClick={handleEdit} fullWidth>
              Edit Profile
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserProfile;
