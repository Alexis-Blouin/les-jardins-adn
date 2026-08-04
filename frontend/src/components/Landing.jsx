import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function Landing() {
  return (
    <Box sx={{ p: 2, maxWidth: "sm", margin: "0 auto" }}>
      <Stack direction="column" spacing={2}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Bienvenue aux Jardins ADN
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "justify" }}>
          Nous sommes situé à Sept-Îles, dans la région de la Côte-Nord. Nous
          offrons une variété de produits frais et locaux, cultivés avec soin et
          passion. Explorez notre site pour découvrir nos produits et en savoir
          plus sur notre ferme.
        </Typography>
      </Stack>
    </Box>
  );
}

export default Landing;
