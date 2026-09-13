import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { useState } from "react";

function List({
  reservations,
  setReservations,
  allReservations = [],
  setAllReservations = [],
  isAdmin = false,
}) {
  const [visibleGroups, setVisibleGroups] = useState({
    past: true,
    today: true,
    next7Days: true,
    future: true,
  });

  const handleGroupVisibilityChange = (group) => (event) => {
    setVisibleGroups((currentGroups) => ({
      ...currentGroups,
      [group]: event.target.checked,
    }));
  };

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
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={visibleGroups.past}
              onChange={handleGroupVisibilityChange("past")}
            />
          }
          label="Réservations passées"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibleGroups.today}
              onChange={handleGroupVisibilityChange("today")}
            />
          }
          label="Aujourd'hui"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibleGroups.next7Days}
              onChange={handleGroupVisibilityChange("next7Days")}
            />
          }
          label="Dans les 7 prochains jours"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={visibleGroups.future}
              onChange={handleGroupVisibilityChange("future")}
            />
          }
          label="Réservations futures"
        />
      </FormGroup>
      {visibleGroups.past && pastReservations.length > 0 && (
        <ReservationsPack
          title="Réservations passées"
          reservations={pastReservations}
          isAdmin={isAdmin}
          mt={2}
        />
      )}
      {visibleGroups.today && todayReservations.length > 0 && (
        <ReservationsPack
          title="Réservations d'aujourd'hui"
          reservations={todayReservations}
          isAdmin={isAdmin}
        />
      )}
      {visibleGroups.next7Days && next7DaysReservations.length > 0 && (
        <ReservationsPack
          title="Réservations dans les 7 prochains jours"
          reservations={next7DaysReservations}
          isAdmin={isAdmin}
        />
      )}
      {visibleGroups.future && futureReservations.length > 0 && (
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

function ReservationsPack({ title, reservations, isAdmin, mt = 4 }) {
  return (
    <>
      <Typography variant="h6" sx={{ mt: mt, mb: 2 }}>
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
