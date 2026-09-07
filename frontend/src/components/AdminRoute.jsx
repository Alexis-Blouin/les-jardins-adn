import CircularProgress from "@mui/material/CircularProgress";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { useRef } from "react";

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const toastShown = useRef(false);

  if (loading) return <CircularProgress />;
  if (!user || !user.accountIsAdmin) {
    if (!toastShown.current) {
      toast("Seul les administrateurs peuvent accéder à cette page", {
        theme: "failure",
      });
      toastShown.current = true;
    }
    return <Navigate to={user ? "/" : "/compte/connexion"} />;
  }

  return children;
}

export default AdminRoute;
