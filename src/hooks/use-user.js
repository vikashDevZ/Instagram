import { useState, useEffect, useContext } from "react";
import { getUserByUserId } from "../services/firebase";
import userContext from "../context/user";

export default function useUser() {
  const [activeUser, setActiveUser] = useState();
  const { user } = useContext(userContext);

  useEffect(() => {
    async function getUserObjByUserId() {
      const [userInfo] = await getUserByUserId(user.uid);
      setActiveUser(userInfo);
      // setActiveUser(userInfo || {});
    }
    console.log(user);

    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return { user: activeUser, setActiveUser };
}
