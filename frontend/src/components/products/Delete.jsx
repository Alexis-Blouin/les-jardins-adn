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

function Delete({
  open,
  handleDeleteClose,
  handleModifyClose,
  productId,
  name,
  imagePublicId,
  setProducts,
}) {
  const [disabled, setDisabled] = useState(false);

  const handleConfirm = async (event) => {
    try {
      const res = await axios.delete("http://localhost:8081/products/delete", {
        // params here since it's delete and not post
        params: {
          productId: productId,
          productImagePublicId: imagePublicId, // Include the current image public id for deletion
        },
      });

      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.productId !== productId),
      );

      toast(res.data.message, { theme: "success" });

      // Close both the delete dialog and the modify dialog as the product doesn't exist anymore
      handleDeleteClose();
      handleModifyClose();

      // Reset the form fields and state after successful submission
      setDisabled(false);
    } catch (err) {
      console.error(err);
      toast("Erreur lors de la suppression du produit.", { theme: "failure" });
      setDisabled(false);
    }
  };

  const handleCancel = () => {
    handleDeleteClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Supprimer {name}</DialogTitle>
      <DialogContent>
        <Typography>Etes-vous sûr de vouloir supprimer "{name}"?</Typography>
        <Alert severity="warning" sx={{ mt: 1 }}>
          Cette action est irréversible.
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} disabled={disabled}>
          Annuler
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={disabled}
          color="error"
          variant="contained"
        >
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Delete;
