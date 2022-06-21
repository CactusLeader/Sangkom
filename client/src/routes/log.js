import { useState } from "react";

import SignUpForm from "../components//login/signUpForm";
import SignInForm from "../components/login/signInForm";

import logo from "../images/logo.png";

export default function Log() {
  const [signUpModal, setSignUpModal] = useState(false);
  const [signInModal, setSignInModal] = useState(false);

  const handleModals = (e) => {
    if (e === "register") {
      setSignInModal(false);
      setSignUpModal(true);
      return;
    }
    setSignInModal(true);
    setSignUpModal(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="relative top-2 flex justify-end">
        <button
          className="px-6 py-2 my-2 mr-2 text-white rounded-full bg-purple hover:bg-blue-400  shadow-lg"
          onClick={() => handleModals("register")}
        >
          S'inscrire
        </button>
        <button
          className="px-6 py-2 my-2 mr-8 rounded-full bg-purple hover:bg-blue-400 text-white shadow-lg"
          onClick={() => handleModals("login")}
        >
          Se connecter
        </button>
      </div>

      <div className="md:mx-auto md:my-auto inline-flex">
        <div>
          <img className="w-32 md:w-64 lg:w-96" src={logo} alt="logo" />
        </div>
        <div className="my-auto pl-14 text-9xl font-extrabold">
          <h1 className="bg-clip-text text-transparent pb-2 -mb-2 bg-gradient-to-r from-purple to-blue-300">
            Sangkom
          </h1>
        </div>
      </div>

      {signUpModal && <SignUpForm setSignUpModal={setSignUpModal} />}
      {signInModal && <SignInForm setSignInModal={setSignInModal} />}

      <div className="relative bottom-2 flex justify-center">
        <p className="text-purple">© MGD | 2022</p>
      </div>
    </div>
  );
}
