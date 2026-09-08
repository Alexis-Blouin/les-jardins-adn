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
import validator from "validator";

function CreateAccount({ user }) {
  const navigate = useNavigate();

  console.log("CreateAccount");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    // Validate the phone number if provided
    if (phone && !validator.isMobilePhone(phone, ["en-CA", "en-US"])) {
      toast("Le numéro de téléphone n'est pas valide", { theme: "failure" });
      return;
    }

    // Make sure the two password match
    if (password !== confirmPassword) {
      toast("Les deux mots de passe doivent être identiques", {
        theme: "failure",
      });
      return;
    }

    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/accounts/create-account`,
      {
        firstName,
        lastName,
        email,
        phone,
        password,
      },
    );

    // Navigate to the login page if the account creation succeeded
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
        mt: 2,
        p: 2,
        maxWidth: "sm",
        ml: {
          xs: 2,
          sm: "auto",
        },
        mr: {
          xs: 2,
          sm: "auto",
        },
      }}
    >
      <form id="createAccount" onSubmit={handleSubmit}>
        <Stack spacing={2} direction={"column"}>
          <Typography variant="h4">Créer un compte</Typography>
          <TextField id="firstName" label="Prénom" required />
          <TextField id="lastName" label="Nom" required />
          <TextField id="email" label="Courriel" type="email" required />
          <TextField id="phone" label="Téléphone" type="tel" />
          <TextField
            id="password"
            label="Mot de passe"
            type="password"
            required
          />
          <TextField
            id="confirmPassword"
            label="Confirmer le mot de passe"
            type="password"
            required
          />
          <Button
            form="createAccount"
            variant="contained"
            color="primary"
            type="submit"
            disabled={!!user}
          >
            Confirmer
          </Button>
          {user ? (
            <Box sx={{ width: "auto" }}>
              <Typography variant="body2">Vous êtes déjà connecté</Typography>
              <Link
                component={RouterLink}
                to="/compte/deconnexion"
                underline="hover"
              >
                Déconnexion
              </Link>
            </Box>
          ) : (
            <Box>
              <Typography variant="body2">Vous avez déjà un compte?</Typography>
              <Link
                component={RouterLink}
                to="/compte/connexion"
                underline="hover"
              >
                Connexion
              </Link>
            </Box>
          )}
        </Stack>
      </form>
    </Paper>
  );
}

export default CreateAccount;
