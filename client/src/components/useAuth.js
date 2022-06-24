import { createContext, useState, useMemo, useContext, useEffect } from "react";
import axios from "axios";
import { getUser } from "../actions/user.actions";
import { useDispatch } from "react-redux";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkToken() {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          console.log("jwtid", res);
          setUid(res.data);
          dispatch(getUser(res.data));
        })
        .catch((err) => console.log("No token"));
    }
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  const value = useMemo(
    () => ({
      uid,
    }),
    [uid]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
