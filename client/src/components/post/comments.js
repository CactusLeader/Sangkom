import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { isEmpty } from "../../utils/utils";

const Comments = ({ post }) => {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.users);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleComment = () => {};

  return (
    <div>
      {post.comments.map((comment) => {
        return (
          <div>
            <div>
              {!isEmpty(usersData[0]) &&
                usersData.map((user) => {
                  if (user._id === comment.commenterId) {
                    return (
                      <div className="flex flex-row pt-4 px-4 border-gray-200 border border-l-0 w-full">
                        <img
                          src={user.avatar}
                          alt="user-avatar"
                          className="rounded-full mr-4 border-purple border-2 w-12 h-12 object-cover"
                        />
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
