import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import toast from "react-simple-toasts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateAccount() {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      toast("Les deux mots de passe doivent être identiques", {
        theme: "failure",
      });
      return;
    }

    const res = await axios.post(
      "http://localhost:8081/accounts/create-account",
      {
        email,
        password,
      },
    );

    if (res.data.success) {
      toast(res.data.message, { theme: "success" });
      navigate("/compte/connexion");
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
      <form id="createAccount" onSubmit={handleSubmit}>
        <Stack spacing={2} direction={"column"}>
          <Typography variant="h4">Create Account</Typography>
          <TextField id="email" label="Email" type="email" required />
          <TextField id="password" label="Password" type="password" required />
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            required
          />
          <Button
            form="createAccount"
            variant="contained"
            color="primary"
            type="submit"
          >
            Create Account
          </Button>
          <Box>
            <Typography variant="body2">Already have an account? </Typography>
            <Link component={RouterLink} to="/account/login" underline="hover">
              Login
            </Link>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
}

export default CreateAccount;
