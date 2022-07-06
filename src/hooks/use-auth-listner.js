import { useState, useEffect } from "react";
import { auth, } from "../lib/firebase";

const useAuthListner = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  useEffect(() => {
    const listner = auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("authUser", JSON.stringify(user));
      } else {
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });

    return () => listner();
  }, [user]);

  return { user };
};

export default useAuthListner;
