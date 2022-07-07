/* eslint-disable */

import React from "react";
import usePhotos from "../hooks/use-photos";
import Post from "./posts";

const timeline = () => {
  const { photos } = usePhotos();
  console.log("photos", photos);
  return (
    <div className="container col-span-2">
      {photos && photos.length>1 ? (
        photos.map((photo) => <Post key={photo.docId} content={photo} />)
      ) : (
        <p className="text-center w-80 text-2xl">Follow someone to view their post (raphael)?</p>
      )}
    </div>
  );
};

export default timeline;
