import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

function ListAdmin({ reservations, setReservations }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const handleOpen = (event, reservation) => {
    setAnchorEl(event.currentTarget);
    setSelectedReservation(reservation);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedReservation(null);
  };

  const open = Boolean(anchorEl);

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
              <IconButton onClick={(e) => handleOpen(e, reservation)}>
                <PersonIcon
                  sx={{
                    color: "primary.main",
                    fontSize: 40,
                  }}
                />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Stack>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {selectedReservation && (
          <Stack spacing={1} sx={{ p: 2, minWidth: 250 }}>
            <Typography variant="h6">Réservé par</Typography>
            <Typography>
              Courriel: {selectedReservation.accountEmail}
            </Typography>
            <Typography>
              Nom: {selectedReservation.accountFirstName}{" "}
              {selectedReservation.accountLastName}
            </Typography>
            <Typography>
              Téléphone: {selectedReservation.accountPhone}
            </Typography>
          </Stack>
        )}
      </Popover>
    </Box>
  );
}

export default ListAdmin;
