import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../actions/post.actions";
import { dateParserPost, isEmpty } from "../../utils/utils";
import Comments from "./comments";
import LikeButton from "./likeButton";
import WhisperDropdown from "./whisperDropdown";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.users);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  return (
    <li key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          {!isEmpty(usersData[0]) &&
            usersData.map((user) => {
              if (user._id === post.posterId) {
                return (
                  <div className="flex flex-row pt-4 px-4 border-gray-200 border border-l-0 w-full">
                    <img
                      src={user.avatar}
                      alt="user-avatar"
                      className="rounded-full mr-4 border-purple border-2 w-12 h-12 object-cover"
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold">{user.pseudo}</span>
                          <span className="ml-2 text-gray-500">
                            · {dateParserPost(post.createdAt)}
                          </span>
                        </div>
                        <div>
                          <WhisperDropdown
                            id={post._id}
                            setIsUpdated={setIsUpdated}
                            isUpdated={isUpdated}
                          />
                        </div>
                      </div>
                      {!isUpdated && <span>{post.message}</span>}
                      {isUpdated && (
                        <div>
                          <textarea
                            defaultValue={post.message}
                            onChange={(e) => setTextUpdate(e.target.value)}
                          />
                          <div>
                            <button onClick={updateItem}>
                              Valider modification
                            </button>
                          </div>
                        </div>
                      )}
                      {post.picture && (
                        // CREER CSS POUR LA PICTURE
                        <img src={post.picture} alt="user card" className="" />
                      )}
                      {post.video && (
                        <iframe
                          width="448"
                          height="252"
                          src={post.video}
                          title={post._id}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      )}
                      <div className="flex flex-row justify-between p-1">
                        <div className="flex flex-row items-center text-gray-500 hover:text-blue-400">
                          <div
                            className="hover:bg-blue-100 rounded-full p-2"
                            onClick={() => setShowComments(!showComments)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                          </div>
                          {post.comments.length > 0 && (
                            <span className="pl-1">{post.comments.length}</span>
                          )}
                        </div>
                        <LikeButton post={post} />
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {showComments && <Comments post={post} />}
                  </div>
                );
              }
              return null;
            })}
        </>
      )}
    </li>
  );
};

export default Card;
