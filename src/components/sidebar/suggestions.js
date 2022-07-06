/* eslint-disable */
import React, { useState, useEffect } from "react";
import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from "./suggested-profile";

const suggestions = ({ userId, following,loggedInUserDocId }) => {
  const [profile, setProfiles] = useState([]);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }

    if (userId) {
      suggestedProfiles();
    }
  }, [userId]);

  useEffect(() => {
    console.log("profile", profile);
  }, [profile]);

  return (
    <>
      {!profile ? (
        <h5>Loading...</h5>
      ) : (
        <div className="rounded flex flex-col">
          <div className="text-sm flex items-center align-items justify-between mb-2">
            <p className="font-bold text-gray-base">Suggestions for you</p>
          </div>
          <div className="mt-4 grid gap-5">
            {profile.map((profile) => (
              <SuggestedProfile
                key={profile.docId}
                profileDocId={profile.docId}
                username={profile.username}
                profileId={profile.userId}
                userId={userId}
                loggedInUserDocId={loggedInUserDocId}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default suggestions;
