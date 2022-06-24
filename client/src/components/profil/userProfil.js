import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dateParser } from "../../utils/utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const UserProfil = ({
  setUpdateProfilModal,
  setFollowersModal,
  setFollowingModal,
}) => {
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="m-0 w-3/6 border">
      <div className="flex flex-row shadow-md py-2">
        <span
          className="self-center mx-4 hover:cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </span>
        <div className="flex flex-col mx-6">
          <span className="font-bold">{userData.pseudo}</span>
          <span> XX whispers </span>
        </div>
      </div>
      <div className="flex flex-row w-full justify-between my-6">
        <img
          className="rounded-full ml-4 border-purple border-4 w-32 h-32 object-cover"
          src={userData.avatar}
          alt="user"
        />
        <span className="self-center">
          <button
            className="justify-end mr-4 font-bold border px-6 py-2 rounded-full bg-purple hover:bg-blue-400 text-white"
            onClick={() => setUpdateProfilModal(true)}
          >
            Editer le profil
          </button>
        </span>
      </div>
      <div className="my-2">
        <span className="text-xl font-bold ml-4">{userData.pseudo}</span>
      </div>
      <div className="ml-4">
        <span>{userData.bio}</span>
      </div>
      <div className="ml-4 my-2 text-gray-600">
        <FontAwesomeIcon icon={faCalendarDays} />
        <span className="ml-2">
          A rejoint Sangkom en {dateParser(userData.createdAt)}
        </span>
      </div>
      <div className="flex flex-row ml-4">
        <div
          onClick={() => setFollowingModal(true)}
          className="hover:cursor-pointer"
        >
          <span className="font-semibold">
            {userData.following ? userData.following.length : "0"}
          </span>
          <span> abonnements</span>
        </div>
        <div
          onClick={() => setFollowersModal(true)}
          className="hover:cursor-pointer ml-2"
        >
          <span className="font-semibold">
            {userData.followers ? userData.followers.length : "0"}
          </span>
          <span> abonnés</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfil;
