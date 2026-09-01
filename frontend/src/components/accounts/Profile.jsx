import Box from "@mui/material/Box";

function Profile({ account }) {
  return (
    <Box sx={{ m: 2 }}>
      <h1>Profil</h1>
      <p>Courriel: {account?.accountEmail}</p>
    </Box>
  );
}

export default Profile;
