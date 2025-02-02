import React, { useEffect } from "react";
import { Avatar } from "primereact/avatar";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import billy from "../assets/billy.jpg";
import jake from "../assets/jake.png";
import lilly from "../assets/lilly.png";
import "./css/Profile.css"

const Profile = () => {
  const navigate = useNavigate();

  const profiles = [
    { name: "Billy", img: billy },
    { name: "Jake", img: jake },
    { name: "Lilly", img: lilly },
  ];

  const handleProfileClick = (profileName) => {
    localStorage.setItem("username", profileName); // Save the selected username to localStorage
    navigate("/api");
  };

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-container">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className="profile-card"
              onClick={() => handleProfileClick(profile.name)}
            >
              <Avatar image={profile.img} size="xlarge" shape="circle" />
              <h3>{profile.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
