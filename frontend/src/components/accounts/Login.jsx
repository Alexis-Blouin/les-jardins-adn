import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import toast from "react-simple-toasts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const res = await axios.post("http://localhost:8081/accounts/login", {
      email,
      password,
    });

    if (res.data.success) {
      toast(res.data.message, { theme: "success" });
      await refreshUser();
      navigate("/");
    } else {
      toast(res.data.message, { theme: "failure" });
    }
  };

  return (
    <Paper
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        p: 2,
        maxWidth: "400px",
      }}
    >
      <form id="login" onSubmit={handleSubmit}>
        <Stack spacing={2} direction={"column"}>
          <Typography variant="h4">Login</Typography>
          <TextField id="email" label="Email" type="email" required />
          <TextField id="password" label="Password" type="password" required />
          <Button
            form="login"
            variant="contained"
            color="primary"
            type="submit"
          >
            Login
          </Button>
          <Box>
            <Typography variant="body2">Don't have an account? </Typography>
            <Link
              component={RouterLink}
              to="/account/create-account"
              underline="hover"
            >
              Create an account
            </Link>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
}

export default Login;
