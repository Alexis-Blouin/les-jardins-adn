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
  publicationId,
  title,
  imagePublicId,
  setPublications,
}) {
  const [disabled, setDisabled] = useState(false);

  const handleConfirm = async (event) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/publications/delete`,
        {
          // params here since it's delete and not post
          params: {
            publicationId: publicationId,
            publicationImagePublicId: imagePublicId, // Include the current image public id for deletion
          },
        },
      );

      setPublications((prevPublications) =>
        prevPublications.filter((p) => p.publicationId !== publicationId),
      );

      toast(res.data.message, { theme: "success" });

      // Close both the delete dialog and the modify dialog as the publication doesn't exist anymore
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
      <DialogTitle>Supprimer {title}</DialogTitle>
      <DialogContent>
        <Typography>Etes-vous sûr de vouloir supprimer "{title}"?</Typography>
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
