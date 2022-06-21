import Navbar from "../components/navbar";
import UserProfil from "../components/profil/userProfil";
import UpdateProfil from "../components/profil/updateProfil";

import { useState } from "react";
import FollowersModal from "../components/profil/followersModal";
import FollowingModal from "../components/profil/followingModal";

const Profil = () => {
  const [updateProfilModal, setUpdateProfilModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);
  const [followersModal, setFollowersModal] = useState(false);

  return (
    <div className="container flex flex-row">
      <Navbar />
      <UserProfil
        setUpdateProfilModal={setUpdateProfilModal}
        setFollowingModal={setFollowingModal}
        setFollowersModal={setFollowersModal}
      />
      {updateProfilModal && (
        <UpdateProfil setUpdateProfilModal={setUpdateProfilModal} />
      )}
      {followingModal && (
        <FollowingModal setFollowingModal={setFollowingModal} />
      )}
      {followersModal && (
        <FollowersModal setFollowersModal={setFollowersModal} />
      )}
    </div>
  );
};

export default Profil;
