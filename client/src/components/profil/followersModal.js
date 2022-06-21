import { useSelector } from "react-redux";
import FollowHandler from "./followHandler";

export default function FollowersModal({ setFollowersModal }) {
  const userData = useSelector((state) => state.user);
  const usersData = useSelector((state) => state.users);

  return (
    <div className="bg-blue-400 bg-opacity-10 absolute w-screen h-screen flex flex-col justify-center items-center">
      <div className="flex items-center justify-center bg-white py-4 px-4 sm:px-6 lg:px-8 rounded-2xl shadow-xl w-full max-w-lg">
        <div className="max-w-lg w-full space-y-8">
          <div className="flex items-center relative">
            <button
              onClick={() => setFollowersModal(false)}
              className="hover:cursor-pointer absolute left-0"
            >
              &#10005;
            </button>
            <div className="flex w-full justify-center">
              <span className="font-bold text-2xl">Abonnés</span>
            </div>
          </div>
          <ul>
            {usersData.map((user) => {
              for (let i = 0; i < userData.followers.length; i++) {
                if (user._id === userData.followers[i]) {
                  return (
                    <li key={user._id} className="flex flex-row my-4">
                      <img
                        src={user.avatar}
                        alt="user-avatar"
                        className="rounded-full mr-4 border-purple border-2 w-12 h-12 object-cover"
                      />
                      <div className="flex flex-col w-full">
                        <div className="flex justify-between items-center pb-2">
                          <span className="font-bold">{user.pseudo}</span>
                          <FollowHandler idToFollow={user._id} />
                        </div>
                        <span>{user.bio}</span>
                      </div>
                    </li>
                  );
                }
              }
              return null;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
