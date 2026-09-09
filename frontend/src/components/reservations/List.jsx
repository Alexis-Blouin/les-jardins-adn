import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import "dayjs/locale/fr";

function List({
  reservations,
  setReservations,
  allReservations = [],
  setAllReservations = [],
  isAdmin = false,
}) {
  if (isAdmin && allReservations.length > 0) {
    reservations = allReservations;
  }
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
              {isAdmin ? (
                <UserDetails reservation={reservation} />
              ) : (
                <Image reservation={reservation} />
              )}
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

export default List;

function Image({ reservation }) {
  return (
    <Box sx={{ flexShrink: 0 }}>
      <img
        className="reservation-image"
        src={reservation.productImageURL}
        alt={reservation.productName}
      />
    </Box>
  );
}

function UserDetails({ reservation }) {
  return (
    <Stack spacing={1}>
      <Typography>
        {reservation.accountFirstName} {reservation.accountLastName}
      </Typography>
      <Typography>{reservation.accountEmail}</Typography>
      <Typography>{reservation.accountPhone}</Typography>
    </Stack>
  );
}
