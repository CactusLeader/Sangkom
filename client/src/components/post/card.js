import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { dateParserPost, isEmpty } from "../../utils/utils";
import LikeButton from "./likeButton";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.users);

  // const [isUpdated, setIsUpdated] = useState(false);
  // const [textUpdate, setTextUpdate] = useState(null);

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

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
                  <div className="flex flex-row my-4 mx-4">
                    <img
                      src={user.avatar}
                      alt="user-avatar"
                      className="rounded-full mr-4 border-purple border-2 w-12 h-12 object-cover"
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex items-center pb-2">
                        <span className="font-bold">{user.pseudo}</span>
                        <span className="ml-2 text-gray-500">
                          · {dateParserPost(post.createdAt)}
                        </span>
                      </div>
                      <span>{post.message}</span>
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
                      <div className="flex flex-row justify-between">
                        <div className="comment-icon">Icon Commentaires</div>
                        <LikeButton post={post} />
                      </div>
                    </div>
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
