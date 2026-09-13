import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import toast from "react-simple-toasts";
import axios from "axios";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function Add({
  product,
  setReservations,
  setAllReservations,
  open,
  handleClose,
  user,
}) {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(null);
  const [pickupTime, setPickupTime] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Update form fields when the product changes
  useEffect(() => {
    if (product) {
      setProductName(product.productName);
    }
  }, [product]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabled(true); // Disable the submit button to prevent multiple submissions

    const pickupTimeFormat = pickupTime.format("YYYY-MM-DD HH:mm:ss");
    const productId = product.productId;

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/reservations/add`,
        {
          quantity,
          pickupTime: pickupTimeFormat,
          productId,
        },
      );

      const newReservation = {
        reservationId: res.data.reservationId,
        accountEmail: user.accountEmail,
        accountFirstName: user.accountFirstName,
        accountLastName: user.accountLastName,
        accountPhone: user.accountPhone,
        productName: productName,
        productPrice: product.productPrice,
        productPriceUnit: product.productPriceUnit,
        productImageURL: product.productImageURL,
        reservationQuantity: quantity,
        reservationPickupTime: pickupTime,
      };
      // Add the reservation to the lists and sort by pickup time
      setReservations((prevReservations) =>
        [...prevReservations, newReservation].sort(
          (a, b) =>
            new Date(a.reservationPickupTime) -
            new Date(b.reservationPickupTime),
        ),
      );

      setAllReservations((prevAllReservations) =>
        [...prevAllReservations, newReservation].sort(
          (a, b) =>
            new Date(a.reservationPickupTime) -
            new Date(b.reservationPickupTime),
        ),
      );

      toast(res.data.message, { theme: "success" });

      handleClose(); // Close the dialog after successful submission

      // Reset the form fields and state after successful submission
      setDisabled(false);
      setQuantity(0);
      setPickupTime(null);
    } catch (err) {
      console.error(err);
      toast("Erreur lors de la réservation", { theme: "failure" });
      setDisabled(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Box>Réserver {productName}</Box>
      </DialogTitle>
      <DialogContent style={{ paddingTop: "5px" }}>
        <Box sx={{ p: 2, maxWidth: "sm", margin: "0 auto" }}>
          <form id="modifyForm" onSubmit={handleSubmit}>
            <Stack direction="column" spacing={2}>
              <TextField
                id="quantity"
                name="quantity"
                label="Quantité"
                type="number"
                placeholder="1"
                value={quantity}
                required
                slotProps={{
                  htmlInput: {
                    min: 0.5,
                    step: 0.5,
                  },
                }}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Moment de récupération"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e)}
                />
              </LocalizationProvider>
            </Stack>
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button
          type="submit"
          form="modifyForm"
          color="primary"
          variant="contained"
          disabled={disabled}
        >
          Réserver
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Add;
