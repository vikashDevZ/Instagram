/* eslint-disable */

import React, { useReducer, useEffect } from "react";
import Header from "./header";
import Photos from "./photos";

import { getUserPhotos } from "../../services/firebase";

const index = ({ user }) => {
  const reducer = (state, newState) => {
    console.log("newState, state", newState, state);
    return { ...state, ...newState };
  };
  const initialState = {
    profile: {},
    photos: null,
    follower: 0,
  };
  const [{ profile, photos, followers }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getUsernInfo() {
      const photos = await getUserPhotos("2");
      dispatch({ profile: user, photos, followers: user.followers.length });
    }
    getUsernInfo();
  }, [user.username]);

  return (
    <div>
      <Header
        photosCount={photos ? photos.length : 0}
        profile={profile}
        followersCount={followers}
        setFollowersCount={dispatch}
      />
      <Photos photos={photos} />
    </div>
  );
};

export default index;
