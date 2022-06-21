import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

export const ProtectedLayout = () => {
  const { uid } = useAuth();

  // if (!uid) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div>
      <Outlet />
    </div>
  );
};
