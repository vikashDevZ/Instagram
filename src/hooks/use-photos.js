/* eslint-disable */

import React, { useContext, useEffect, useState } from "react";
import userContext from "../context/user";
import { getTLPhotos, getUserByUserId } from "../services/firebase";

const usePhotos = () => {
  const [photos, setPhotos] = useState(null);
  const { user } = useContext(userContext);

  useEffect(() => {
    async function getTimeLinePhoto() {
      const [userInfo] = await getUserByUserId(user.uid);
      const { following } = userInfo;

      let followedUserPhotos = [];

      if (userInfo) {
        followedUserPhotos = await getTLPhotos(user.uid, following);
        console.log("followedUserPhotos", followedUserPhotos);
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    }

    if (user) {
      getTimeLinePhoto();
    }
  }, [user]);

  return { photos };
};

export default usePhotos;
