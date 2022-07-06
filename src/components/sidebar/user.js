/* eslint-disable */
import PropTypes from "prop-types";
import React, { memo } from "react";
import { Link } from "react-router-dom";

const User = ({ username, fullName }) => {
  console.log(username, fullName);
  return (
    <div>
      {!username || !fullName ? (
        <div>no</div>
      ) : (
        <div>
          {" "}
          <Link to={`/p/${username}`} className="grid">
            <div className="flex items-center justify-between col-span-1">
              <img
                className="rounded-full w-16 flex mr-3"
                src={`/images/avatars/${username}.jpg`}
                alt=""
                onError={(e) => {
                  // e.target.src = DEFAULT_IMAGE_PATH;
                }}
              />
            </div>
            <div className="col-span-3">
              <p className="font-bold text-sm">{username}</p>
              <p className="text-sm">{fullName}</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default memo(User);

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
};
