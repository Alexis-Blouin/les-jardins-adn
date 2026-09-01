import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useAuth from "../../hooks/useAuth";

function Logout() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const didLogout = React.useRef(false);

  useEffect(() => {
    // Make sure to not logout twice in a row
    if (didLogout.current) return;
    didLogout.current = true;

    // TODO fix the order of things like the login.jsx one, i guess
    const logout = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/accounts/logout`,
        );
        toast(res.data.message, { theme: "success" });
        setUser(null);
        // Navigate to the login page once the logout is done
        navigate("/compte/connexion");
      } catch (error) {
        toast("La déconnexion a échoué", { theme: "failure" });
        navigate("/");
      }
    };

    logout();
  }, [navigate, setUser]);

  return (
    <Paper
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        p: 2,
      }}
    >
      <Typography variant="h4" align="center" sx={{ p: 2 }}>
        Déconnexion en cours...
      </Typography>
    </Paper>
  );
}

export default Logout;
