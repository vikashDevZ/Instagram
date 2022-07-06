/* eslint-disable */

import React from "react";
import usePhotos from "../hooks/use-photos";
import Post from "./posts";

const timeline = () => {
  const { photos } = usePhotos();
  console.log("photos", photos);
  return (
    <div className="container col-span-2">
      {photos &&
        photos.map((photo) => <Post key={photo.docId} content={photo} />)}
    </div>
  );
};

export default timeline;
