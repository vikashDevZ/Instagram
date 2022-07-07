/* eslint-disable */

import React, { useEffect, useState } from "react";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";
import { DEFAULT_IMAGE_PATH } from "../../constants/path";

const Header = ({
  photosCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers = [],
    following = [],
    username: profileUsername,
  },
  followersCount,
  setFollowersCount,
}) => {
  const { user } = useUser();
  console.log("currentUser", user);
  console.log("profileUSer", profileUserId);

  const [isFollowing, setisFollowing] = useState(null);
  const isDifferentUser = user && user?.username !== profileUsername;

  const handleToggleFollow = async () => {
    setisFollowing((prev) => !prev);
    setFollowersCount({
      followersCount: isFollowing ? followersCount - 1 : followersCount + 1,
    });
    await toggleFollow(
      isFollowing,
      user.docId,
      profileDocId,
      user.userId,
      profileUserId
    );
    // console.log(isFollowing, user.docId, profileDocId);
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollow = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setisFollowing(isFollow);
    };

    if (user && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user, profileUserId]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        {profileUsername ? (
          <img
            className="rounded-full h-40 w-40 flex"
            alt={`${fullName} profile picture`}
            src={`/images/avatars/${profileUsername}.jpg`}
            onError={(e) => {
              e.target.src = DEFAULT_IMAGE_PATH;
            }}
          />
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profileUsername}</p>
          {!isDifferentUser ? (
            <div>{null}</div>
          ) : (
            isDifferentUser && (
              <button
                className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                type="button"
                onClick={handleToggleFollow}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleToggleFollow();
                  }
                }}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )
          )}
        </div>
        <div className="container flex mt-4">
          {!followers || !following ? (
            <h1>loading...</h1>
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span> photos
              </p>
              <p className="mr-10">
                <span className="font-bold">{followersCount}</span>
                {` `}
                {followersCount === 1 ? `follower` : `followers`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{following?.length}</span> following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!fullName ? <h1>loading...</h1> : fullName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
