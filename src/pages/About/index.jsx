import React from "react";
import { Typography } from "@material-tailwind/react";

const About = () => {
  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <Typography variant="h3" color="blue-gray" className="mb-6">
          About Us
        </Typography>
        <Typography variant="lead" className="mb-4">
          Welcome to our second-hand marketplace – your trusted platform for
          buying and selling pre-owned goods.
        </Typography>
        <Typography className="mb-4 text-lg">
          Our mission is to make it easy and secure for individuals to give a
          second life to their used items while helping others find great deals.
          Whether you're decluttering your home or searching for affordable
          items, our platform connects buyers and sellers in a simple,
          eco-friendly way.
        </Typography>
        <Typography className="text-lg">
          By promoting the reuse of goods, we aim to reduce waste and contribute
          to a more sustainable future. Join us in making a difference – one
          item at a time.
        </Typography>
      </div>
    </div>
  );
};

export default About;
