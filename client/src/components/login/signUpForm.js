import axios from "axios";
import { useState } from "react";
import logo from "../../images/logo.png";

export default function SignUpForm({ setSignUpModal }) {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordControlError = document.querySelector(
      ".passwordControl.error"
    );
    const termsError = document.querySelector(".terms.error");

    passwordControlError.innerHTML = "";
    termsError.innerHTML = "";

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordControlError.innerHTML =
          "Les mots de passe ne correspondent pas";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}users/register`,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="absolute bg-white w-screen h-screen ">
      <div className="bg-blue-400 bg-opacity-10 w-screen h-screen flex flex-col justify-center items-center">
        <div className="flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 rounded-2xl shadow-xl">
          <div className="max-w-md w-full space-y-8">
            <div>
              <button onClick={() => setSignUpModal(false)}> X </button>

              <img src={logo} alt="logo" className="mx-auto h-12 w-auto" />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Créer votre compte
              </h2>
            </div>

            <div className="max-w-md overflow-hidden p-5">
              <form
                action=""
                onSubmit={handleRegister}
                id="sign-up-form"
                className="space-y-4"
              >
                <div className="-space-y-px">
                  <div className="grid gap-6">
                    <div className="col-span-12">
                      <label
                        htmlFor="pseudo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Pseudo
                      </label>
                      <input
                        type="text"
                        name="pseudo"
                        id="pseudo"
                        onChange={(e) => setPseudo(e.target.value)}
                        value={pseudo}
                        autoComplete="username"
                        className="mt-1 focus:outline-none focus:border-purple block w-full px-3 py-2 shadow-sm sm:text-sm border border-gray-300 rounded-md"
                      />
                      <div className="pseudo error"></div>
                    </div>
                    <div className="col-span-12">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        autoComplete="email"
                        className="mt-1 focus:outline-none focus:border-purple block w-full px-3 py-2 shadow-sm sm:text-sm border border-gray-300 rounded-md"
                      />
                      <div className="email error"></div>
                    </div>
                    <div className="col-span-12">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Mot de passe
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        autoComplete="new-password"
                        className="mt-1 focus:outline-none focus:border-purple block w-full px-3 py-2 shadow-sm sm:text-sm border border-gray-300 rounded-md"
                      />
                      <div className="password error"></div>
                    </div>
                    <div className="col-span-12">
                      <label
                        htmlFor="password-control"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Vérification du mot de passe
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password-control"
                        onChange={(e) => setControlPassword(e.target.value)}
                        value={controlPassword}
                        autoComplete="new-password"
                        className="mt-1 focus:outline-none focus:border-purple block w-full px-3 py-2 shadow-sm sm:text-sm border border-gray-300 rounded-md"
                      />
                      <div className="passwordControl error"></div>
                    </div>
                    <div className="col-span-12">
                      <input type="checkbox" id="terms" className="mr-2" />
                      <label htmlFor="terms">
                        J'accepte les{" "}
                        <a
                          href="/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400"
                        >
                          conditions générales
                        </a>
                      </label>
                      <div className="terms error"></div>
                      <div className="col-span-12 my-4">
                        <button
                          type="submit"
                          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                        >
                          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg
                              className="h-5 w-5 text-blue-300 group-hover:text-blue-200"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="True"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </span>
                          Valider
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
