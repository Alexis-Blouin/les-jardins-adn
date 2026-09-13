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

  // Filter the reservations to groups with 'past', 'today', '7 days' and 'future' classes
  const pastReservations = reservations.filter((r) =>
    dayjs(r.reservationPickupTime).isBefore(dayjs(), "day"),
  );
  const todayReservations = reservations.filter((r) =>
    dayjs(r.reservationPickupTime).isSame(dayjs(), "day"),
  );
  const next7DaysReservations = reservations.filter(
    (r) =>
      dayjs(r.reservationPickupTime).isAfter(dayjs(), "day") &&
      dayjs(r.reservationPickupTime).isBefore(dayjs().add(7, "day"), "day"),
  );
  const futureReservations = reservations.filter((r) =>
    dayjs(r.reservationPickupTime).isAfter(dayjs().add(7, "day"), "day"),
  );

  dayjs.locale("fr");
  return (
    <Box sx={{ p: 2, maxWidth: "xl", margin: "0 auto" }}>
      {pastReservations.length > 0 && (
        <ReservationsPack
          title="Réservations passées"
          reservations={pastReservations}
          isAdmin={isAdmin}
        />
      )}
      {todayReservations.length > 0 && (
        <ReservationsPack
          title="Réservations d'aujourd'hui"
          reservations={todayReservations}
          isAdmin={isAdmin}
        />
      )}
      {next7DaysReservations.length > 0 && (
        <ReservationsPack
          title="Réservations dans les 7 prochains jours"
          reservations={next7DaysReservations}
          isAdmin={isAdmin}
        />
      )}
      {futureReservations.length > 0 && (
        <ReservationsPack
          title="Réservations futures"
          reservations={futureReservations}
          isAdmin={isAdmin}
        />
      )}
    </Box>
  );
}

export default List;

function ReservationsPack({ title, reservations, isAdmin }) {
  return (
    <>
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        {title}
      </Typography>
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
    </>
  );
}

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
