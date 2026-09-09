import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import "dayjs/locale/fr";

function ListAdmin({ reservations, setReservations }) {
  dayjs.locale("fr");
  return (
    <Box sx={{ p: 2, maxWidth: "xl", margin: "0 auto" }}>
      <Stack direction="column" spacing={2}>
        {reservations.map((reservation) => (
          <Paper sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Stack direction="column" spacing={2}>
                <Typography>{reservation.productName}</Typography>
                <Typography>
                  {reservation.reservationQuantity}{" "}
                  {reservation.productPriceUnit}(s)
                </Typography>
                <Typography>
                  {dayjs(reservation.reservationPickupTime).format(
                    "D MMMM YYYY [à] HH:mm",
                  )}
                </Typography>
              </Stack>
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
