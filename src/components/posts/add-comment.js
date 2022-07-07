import { useState, useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "../../context/user";
import { db } from "../../lib/firebase";
import { arrayUnion, updateDoc } from "firebase/firestore/lite";
import { doc } from "firebase/firestore/lite";

export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput,
}) {
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);

  if (user) {
    var displayName = user.displayName;
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    setComments([...comments, { displayName, comment }]);
    setComment("");

    const commentDoc = doc(db, "photos", docId);
    await updateDoc(commentDoc, {
      comments: arrayUnion({ comment, displayName }),
    });

    // return firebase
    //   .firestore()
    //   .collection('photos')
    //   .doc(docId)
    //   .update({
    //     comments: FieldValue.arrayUnion({ displayName, comment })
    //   });
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(e) =>
          comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault()
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && "opacity-25"
          }`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object,
};
