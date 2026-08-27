import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function List({ reservations, setReservations }) {
  return (
    <Box sx={{ p: 2, maxWidth: "xl", margin: "0 auto" }}>
      <Stack direction="column" spacing={2}>
        {reservations.map((reservation) => (
          <Paper>
            <Stack direction="row" spacing={2}>
              <Typography variant="body1">{reservation.productName}</Typography>
              <Typography variant="body1">
                {reservation.reservationQuantity}
              </Typography>
              <Typography variant="body1">
                {reservation.reservationPickupTime}
              </Typography>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

export default List;
