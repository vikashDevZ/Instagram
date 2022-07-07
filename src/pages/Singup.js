/* eslint-disable */
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, app, db } from "../lib/firebase";
import { DASHBOARD } from "../constants/routes";
import {
  collection,
  docs,
  where,
  setDoc,
  getDocs,
  query,
  doc,
  set,
} from "firebase/firestore/lite";

// import { doesUsernameExist } from "../services/firebase";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setfullName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const [docUid, setDocUid] = useState("");

  const isInvalid = password === "" || email === "";

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(fullName, username, password, email, error);

    const doesUsernameExist = async (username) => {
      const user = query(
        collection(db, "users"),
        where("username", "==", username)
      );

      const querySnapshot = await getDocs(user);

      return querySnapshot.empty;

      // let ifUserExist = false;
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.data(), doc.id);
      //   console.log(doc.data().lenght > 0 ,"document data");
      //   doc.data().lenght > 0 ? (ifUserExist = true) : (ifUserExist = false);

      //   console.log(ifUserExist);
      // });
    };

    const usernotExists = await doesUsernameExist(username);
    console.log(usernotExists);

    if (usernotExists) {
      try {
        await createUserWithEmailAndPassword(auth, email, password).then(() =>
          console.log("hi")
        );
      } catch (error) {
        console.log(error);
      }
      if (auth.currentUser) {
        try {
          console.log("adding user details", auth.currentUser);
          updateProfile(auth.currentUser, {
            displayName: username,
          });
          await setDoc(doc(db, "users", auth.currentUser.uid), {
            username: username.toLowerCase(),
            userId: auth.currentUser.uid,
            fullName,
            email: email.toLowerCase(),
            following: [],
            dateCreated: Date.now(),
          })
            .then(() => navigate("/"))
            .then(() => window.location.reload());
        } catch (error) {
          console.log(err);
          setEmail("");
          setPassword("");
          setfullName("");
          setUsername("");
          setError("");
          setDocUid("");
        }
      }
    }else{
      setError("usrname is already taken")
    }
  };

  useEffect(() => {
    document.title = "SignUp - Insta";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmail(target.value)}
              value={email}
            />
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setfullName(target.value)}
              value={fullName}
            />

            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
            ${isInvalid && "opacity-50"}`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Have an account?{` `}
            {/* <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
              Sign up
            </Link> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
