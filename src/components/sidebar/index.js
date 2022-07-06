/* eslint-disable */

import React from "react";
import useUser from "../../hooks/use-user";
import Suggestions from "./suggestions";
import User from "./user";

const sidebar = () => {
  const { user } = useUser();
  const userId = user?.userId;
  const fullName = user?.fullName;
  const username = user?.username;
  const following = user?.following;
  const docId = user?.docId;
  // console.log(user?.docId);
  // console.log(user?.userId);
  // console.log("hey");
  return (
    <div className="p-4">
      <User username={username} fullName={fullName} following={following} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
};

export default sidebar;

// import { useContext } from 'react';
// import User from './user';
// import Suggestions from './suggestions';
// import LoggedInUserContext from '../../context/logged-in-user';

// export default function Sidebar() {
//   const { user: { docId = '', fullName, username, userId, following } = {} } = useContext(
//     LoggedInUserContext
//   );

//   return (
//     <div className="p-4">
//       <User username={username} fullName={fullName} />
//       <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
//     </div>
//   );
// }
