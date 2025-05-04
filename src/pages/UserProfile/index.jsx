import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Avatar,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const userId = useSelector((state) => state.auth);
  console.log(userId, "user id ");
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/user/profile/${userId?.data?.id}`,
          {
            headers: {
              Authorization: `Bearer ${userId?.token}`,
            },
          }
        );
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    if (userId) fetchProfile();
  }, [userId]);

  if (!profile) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className=" p-6 bg-gray-100 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardBody className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.firstName} ${profile.lastName}`}
              alt={profile.firstName}
              size="xl"
            />
            <Typography variant="h5">
              {profile.firstName} {profile.lastName}
            </Typography>
            <Typography className="text-gray-600">{profile.email}</Typography>
          </div>

          <div className="space-y-3 mt-6">
            <div>
              <Typography variant="small" className="text-gray-500">
                Phone
              </Typography>
              <Typography>{profile.phone}</Typography>
            </div>
            <div>
              <Typography variant="small" className="text-gray-500">
                Address
              </Typography>
              <Typography>{profile.address}</Typography>
            </div>
          </div>

          <div className="pt-4">
            <Button
              color="blue"
              onClick={() => navigate("/edit-profile")}
              fullWidth
            >
              Edit Profile
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserProfile;
