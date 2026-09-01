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
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          À propos
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "justify" }}>
          Biodynamie: est une manière d’améliorer la terre avec le travail des
          animaux de la ferme. Renourir le sol grâce aux fientes et travail des
          volailles et autres espèces donne aux Jardins une fertilisation
          naturelle. Les anciens savaient comment fertiliser nos sols Nord
          Côtier. Aux Jardins ADN nous cultivons naturellement tout nos fruits
          et légumes offert aux consommateurs. Mangez vrai, mangez frais!
        </Typography>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Où sommes nous?
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Nous somme situés au 3370 Rte 138 O, Sept-Îles, QC G4R 4K1
        </Typography>
        <Box sx={{ maxWidth: "sm" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1545.5347839566273!2d-66.50047393655494!3d50.24833437677312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4c91e19b8c0417c5%3A0x5766249919e14e81!2s3370%20Rte%20138%20O%2C%20Sept-%C3%8Eles%2C%20QC%20G4R%204K1!5e1!3m2!1sen!2sca!4v1788011053636!5m2!1sen!2sca"
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: 8 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </Box>
      </Stack>
    </Box>
  );
}

export default Landing;
