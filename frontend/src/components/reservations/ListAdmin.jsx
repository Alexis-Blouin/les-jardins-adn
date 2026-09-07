import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function ListAdmin({ reservations, setReservations }) {
  return (
    <Box sx={{ p: 2, maxWidth: "xl", margin: "0 auto" }}>
      <Stack direction="column" spacing={2}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 2fr 250px",
            gap: 2,
            alignItems: "center",
            pl: 2,
            pr: 2,
          }}
        >
          <Typography variant="h5">Produit</Typography>
          <Typography variant="h5">Quantité</Typography>
          <Typography variant="h5">Date de récupération</Typography>
          <Typography variant="h5">Contact</Typography>
        </Box>

        {reservations.map((reservation) => (
          <Paper sx={{ p: 2 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 2fr 250px",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Typography>{reservation.productName}</Typography>
              <Typography>{reservation.reservationQuantity}</Typography>
              <Typography>{reservation.reservationPickupTime}</Typography>
              <Stack spacing={1}>
                <Typography>
                  {reservation.accountFirstName} {reservation.accountLastName}
                </Typography>
                <Typography>{reservation.accountEmail}</Typography>
                <Typography>{reservation.accountPhone}</Typography>
              </Stack>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

export default ListAdmin;
