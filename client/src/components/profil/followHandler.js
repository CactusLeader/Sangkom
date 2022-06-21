import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/user.actions";
import { isEmpty } from "../../utils/utils";

const FollowHandler = ({ idToFollow }) => {
  const userData = useSelector((state) => state.user);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow));
    setIsFollowed(false);
  };

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <button
          onClick={handleUnfollow}
          text="Abonné"
          textOnHover="Se désabonner"
          className=" after:content-[attr(text)] hover:after:content-[attr(textOnHover)] justify-end font-bold border px-4 py-1 rounded-full bg-blue-400 hover:bg-red-200 hover:text-red-600 text-white"
        ></button>
      )}
      {!isFollowed && (
        <button
          onClick={handleFollow}
          className="justify-end font-bold border px-4 py-1 rounded-full bg-purple hover:bg-blue-400 text-white"
        >
          Suivre
        </button>
      )}
    </>
  );
};

export default FollowHandler;
