import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

export const HomeLayout = () => {
  const { uid } = useAuth();

  if (uid) {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};
