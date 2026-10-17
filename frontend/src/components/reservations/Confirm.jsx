import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import axios from "axios";
import toast from "react-simple-toasts";

function Confirm({ open, handleClose, reservationId, setReservations }) {
  const handleConfirm = async (event) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/reservations/complete`,
        {
          reservationId: reservationId,
        },
      );

      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.reservationId === reservationId
            ? { ...reservation, reservationCompleted: true }
            : reservation,
        ),
      );

      toast(response.data.message, { theme: "success" });

      handleClose();
    } catch (error) {
      console.error("Error completing reservation:", error);
      toast("Erreur lors de la complétion de la réservation", {
        theme: "failure",
      });
    }
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Compléter la réservation</DialogTitle>
      <DialogContent>
        <Typography>
          Veuillez confirmer la complétition de la réservation
        </Typography>
        <Alert severity="warning" sx={{ mt: 1 }}>
          Cette action est irréversible.
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Annuler</Button>
        <Button onClick={handleConfirm} color="success" variant="contained">
          Compléter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Confirm;
