import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio, uploadPicture } from "../../actions/user.actions";

export default function UpdateProfil({ setUpdateProfilModal }) {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [bio, setBio] = useState("");
  console.log("bio", bio);

  const [file, setFile] = useState("");
  const [{ alt, src }, setImg] = useState({
    src: userData.avatar,
    alt: "Upload an Image",
  });

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
      setFile(e.target.files[0]);
    }
  };

  const handleUpdate = (e) => {
    if (file) {
      e.preventDefault();
      const data = new FormData();
      data.append("name", userData.pseudo);
      data.append("id", userData._id);
      data.append("image", file);

      dispatch(uploadPicture(data, userData._id));
    }

    if (bio !== userData.bio) {
      dispatch(updateBio(userData._id, bio));
    }

    setUpdateProfilModal(false);
  };

  return (
    <div className="bg-blue-400 bg-opacity-10 absolute w-screen h-screen flex flex-col justify-center items-center">
      <div className="flex items-center justify-center bg-white py-4 px-4 sm:px-6 lg:px-8 rounded-2xl shadow-xl w-full max-w-lg">
        <div className="max-w-lg w-full space-y-8">
          <div className="flex justify-between">
            <div className="self-center">
              <button onClick={() => setUpdateProfilModal(false)}>
                &#10005;
              </button>
              <span className="ml-4 font-bold text-2xl">Editer le profil</span>
            </div>
            <button
              type="submit"
              form="updateForm"
              className="justify-end font-bold border px-6 py-2 rounded-full bg-purple hover:bg-blue-400 text-white"
            >
              Enregistrer
            </button>
          </div>
          <form id="updateForm" onSubmit={handleUpdate}>
            <div className="flex justify-center">
              <div className="flex relative w-32 h-32 justify-center items-center">
                <input
                  type="file"
                  id="select-image"
                  name="image"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleImg}
                  className="hidden"
                />
                <img
                  className="rounded-full block border-purple border-4 object-cover w-32 h-32"
                  src={src}
                  alt={alt}
                  component="span"
                />
                <label
                  htmlFor="select-image"
                  className="absolute flex opacity-75 fill-white hover:bg-gray-400 bg-gray-600 rounded-3xl p-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 5h-3v-1h3v1zm8 5c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm11-4v15h-24v-15h5.93c.669 0 1.293-.334 1.664-.891l1.406-2.109h8l1.406 2.109c.371.557.995.891 1.664.891h3.93zm-19 4c0-.552-.447-1-1-1-.553 0-1 .448-1 1s.447 1 1 1c.553 0 1-.448 1-1zm13 3c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5z" />
                  </svg>
                </label>
              </div>
            </div>
            <div className="mt-8 space-y-6" id="bioForm">
              <div className="relative rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="bio" className="">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    onChange={(e) => setBio(e.target.value)}
                    defaultValue={userData.bio}
                    id="bio"
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple focus:border-purple focus:z-10 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
