/* eslint-disable */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserbyUsername } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import UserProfile from "../components/profile";

const Profile = () => {
  const { username } = useParams();
  // console.log("username", username);
  const [userExist, setuserExist] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function isUserExist() {
      const [userData] = await getUserbyUsername(username);
      // console.log("userData", userData);
      if (userData?.userId) {
        setUser(userData);
        setuserExist(true);
      } else {
        setuserExist(false);
        return navigate("/login");
      }
    }
    isUserExist();
  }, [username, userExist]);

  return (
    <>
      {!userExist ? (
        <h1>Loading...</h1>
      ) : (
        <div className="bg-gray-background">
          <Header />
          <div className="mx-auto max-w-screen-lg">
            <UserProfile user={user} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
