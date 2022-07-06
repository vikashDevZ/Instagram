/* eslint-disable */
import { auth, db } from "../lib/firebase";
import {
  arrayRemove,
  collection,
  arrayUnion,
  updateDoc,
  getDocs,
  getDoc,
  limit,
  where,
  query,
  doc,
  onSnapshot,
} from "firebase/firestore/lite";
import { async } from "@firebase/util";

export async function doesUsernameExist(username) {
  const userRef = collection(db, "users");
  const user = query(userRef, where("username", "==", username));

  onSnapshot(userRef, (snap) => {
    snap.docs.forEach((doc) => {
      //   console.log(doc.data(), doc.id);
    });
  });

  // const result = onSnapshot(user, (snap) => {
  //   console.log(snap);
  //   const result = snap.docs.map((doc) => {
  //     console.log(doc.data(), doc.id);
  //   });
  //   console.log(result);
  //   return result;
  // });

  const querySnapshot = await getDocs(user);

  console.log(querySnapshot);
  return querySnapshot;

  // querySnapshot.forEach((doc) => {
  //   console.log(doc.data());
  //   return doc.data();
  // });
}

export const getUserByUserId = async (userId) => {
  const userRef = collection(db, "users");
  const result = query(userRef, where("userId", "==", userId));

  const userData = await getDocs(result);

  const userInfo = userData.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  // console.log("userDoc", userInfo);
  return userInfo;
};

export const getSuggestedProfiles = async (userid, following) => {
  const userRef = collection(db, "users");
  const profiles = query(userRef, limit(10));

  const profileData = await getDocs(profiles);

  const result = profileData.docs
    .map((item) => ({
      ...item.data(),
      docId: item.id,
    }))
    .filter(
      (profile) =>
        profile.userId !== userid && !following.includes(profile.userId)
    );

  return result;
};

export const updateLoggedInUserFollowing = async (
  loggedInUserDocId,
  profileId,
  flag
) => {
  const userRef = doc(db, "users", loggedInUserDocId);

  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    console.log("userSnap.data()", userSnap.data());
  }
  await updateDoc(userRef, {
    following: flag ? arrayRemove(profileId) : arrayUnion(profileId),
  });
};

export const updateFollowedUserFollowers = async (
  profileDocId,
  loggedInUserDocId,
  flag
) => {
  const userRef = doc(db, "users", profileDocId);

  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    console.log("userSnap.data()", userSnap.data());
  }
  await updateDoc(userRef, {
    followers: flag
      ? arrayRemove(loggedInUserDocId)
      : arrayUnion(loggedInUserDocId),
  });
};

export const getTLPhotos = async (userId, following = []) => {
  const postsRef = collection(db, "photos");
  const result = query(postsRef, where("userId", "in", following));

  const postData = await getDocs(result);

  const postWhichUserFollows = postData.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  const photosWithUserDetails = await Promise.all(
    postWhichUserFollows.map(async (photo) => {
      let isPhotoLiked = false;
      if (photo?.likes?.includes(userId)) {
        isPhotoLiked = true;
      }

      const photoUserDetail = await getUserByUserId(photo.userId);
      const { username } = photoUserDetail[0];

      return { ...photo, username, isPhotoLiked };
    })
  );

  return photosWithUserDetails;
};

export const getUserbyUsername = async (username) => {
  // const userRef = collection(db, "users");
  const user = query(
    collection(db, "users"),
    where("username", "==", username)
  );
  const userSnap = await getDocs(user);
  return userSnap.docs.map((item) => ({ ...item.data(), docId: item.id }));
};

export const getUserPhotos = async (userId) => {
  const result = query(collection(db, "photos"), where("userId", "==", userId));

  const photoData = await getDocs(result);

  const Photos = photoData.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return Photos;
};
