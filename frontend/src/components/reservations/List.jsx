import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function List({ reservations, setReservations }) {
  return (
    <Box sx={{ p: 2, maxWidth: "xl", margin: "0 auto" }}>
      <Stack direction="column" spacing={2}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 2fr 200px",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Produit</Typography>
          <Typography variant="h5">Quantité</Typography>
          <Typography variant="h5">Date de récupération</Typography>
        </Box>

        {reservations.map((reservation) => (
          <Paper sx={{ p: 2 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 2fr 200px",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Typography>{reservation.productName}</Typography>
              <Typography>{reservation.reservationQuantity}</Typography>
              <Typography>{reservation.reservationPickupTime}</Typography>
              <Box sx={{ width: "200px", textAlign: "center" }}>
                <img
                  className="reservation-image"
                  src={reservation.productImageURL}
                  alt={reservation.productName}
                />
              </Box>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

export default List;
