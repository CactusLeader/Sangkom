import logo from "../images/logo.png";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const userData = useSelector((state) => state.user);

  return (
    <nav className="border h-screen w-64 overflow-y-auto py-4 px-3 bg-gray-50 rounded">
      <div className="container">
        <div>
          <a className="mr-4 py-2" href="/home">
            <img src={logo} alt="Logo" className="w-16" />
          </a>
        </div>
        <div className="flex flex-col pb-2 mt-4">
          <div className="hover:cursor-pointer mx-auto  w-4/5 mb-4">
            <div className="flex items-center">
              <NavLink
                to="/home"
                className="hover:bg-gray-200 rounded-2xl p-3 flex items-center"
              >
                {({ isActive }) => (
                  <>
                    <FontAwesomeIcon icon={faHouse} size="xl" />

                    <span
                      className={
                        isActive
                          ? "ml-2 font-semibold text-2xl"
                          : "ml-2 font-light text-2xl"
                      }
                    >
                      Accueil
                    </span>
                  </>
                )}
              </NavLink>
            </div>
          </div>
          <div className="hover:cursor-pointer mx-auto w-4/5">
            <div className="flex items-center">
              <NavLink
                to="/profil"
                className="hover:bg-gray-200 rounded-2xl p-3 flex items-center"
              >
                {({ isActive }) => (
                  <>
                    <FontAwesomeIcon icon={faUser} size="xl" />
                    <span
                      className={
                        isActive
                          ? "ml-2 font-semibold text-2xl"
                          : "ml-2 font-light text-2xl"
                      }
                    >
                      Profil
                    </span>
                  </>
                )}
              </NavLink>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="absolute bottom-4 flex rounded-full hover:bg-gray-200 p-4 items-center"
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="dropdown"
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={userData.avatar}
            alt="user"
          />
          <span className="pl-3 font-bold text-lg">{userData.pseudo}</span>
        </button>
      </div>
    </nav>
  );
}
