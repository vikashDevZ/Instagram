/* eslint-disable */

import React, { useReducer, useEffect } from "react";
import Header from "./header";
import Photos from "./photos";

import { getUserPhotos } from "../../services/firebase";

const index = ({ user }) => {
  console.log('user', user)
  const reducer = (state, newState) => {
    // console.log("state", state, newState);
    return { ...state, ...newState };
  };
  const initialState = {
    profile: {},
    photos: null,
    follower: 0,
  };
  const [{ profile, photos, followersCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getUsernInfo() {
      const photos = await getUserPhotos(user.userId);
      dispatch({
        profile: user,
        photos,
        followersCount: user.followers? user.followers.length:0,
      });
    }
    getUsernInfo();
  }, [user.username]);

  return (
    <div>
      <Header
        photosCount={photos ? photos.length : 0}
        profile={profile}
        followersCount={followersCount}
        setFollowersCount={dispatch}
      />
      <Photos photos={photos} />
    </div>
  );
};

export default index;
