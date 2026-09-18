import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ImageFilePicker from "../inputs/ImageFilePicker";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import toast from "react-simple-toasts";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState, useEffect } from "react";
import Delete from "./Delete";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";

function Modify({ publication, setPublications, open, handleClose }) {
  const [publicationId, setPublicationId] = useState(null);
  const [title, setTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageURL, setPublicationImageURL] = useState("");
  const [imagePublicId, setPublicationImagePublicId] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [imageModified, setImageModified] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Update form fields when the publication changes
  useEffect(() => {
    if (publication) {
      setPublicationId(publication.publicationId);
      setTitle(publication.publicationTitle);
      setOriginalTitle(publication.publicationTitle);
      setContent(publication.publicationContent);
      setPublicationImageURL(publication.publicationImageURL);
      setPublicationImagePublicId(publication.publicationImagePublicId);
      setImagePreview(publication.publicationImageURL);
    }
  }, [publication]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabled(true); // Disable the submit button to prevent multiple submissions

    // Create a FormData object to send the publication data, including the image file
    const formData = new FormData();
    formData.append("publicationId", publicationId); // Include the publication ID for updating
    formData.append("publicationTitle", title);
    formData.append("publicationContent", content);
    formData.append("publicationImageURL", imageURL);
    formData.append("publicationImagePublicId", imagePublicId); // Include the current image public id for deletion

    if (imageModified) {
      formData.append("publicationImage", imageFile, imageFile.name);
    }

    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/publications/modify`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // Modify the publications list in the parent component with the newly added publication
      const modifiedPublication = {
        publicationId: publicationId,
        publicationTitle: title,
        publicationContent: content,
        publicationImageURL: res.data.publicationImageURL,
        publicationImagePublicId: res.data.publicationImagePublicId,
      };
      setPublications((prevPublications) =>
        prevPublications.map((p) =>
          p.publicationId === publication.publicationId
            ? modifiedPublication
            : p,
        ),
      );

      toast(res.data.message, { theme: "success" });

      handleClose(); // Close the dialog after successful submission

      // Reset the form fields and state after successful submission
      setDisabled(false);
      setTitle("");
      setContent("");
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      toast("Erreur lors de la modification de la publication.", {
        theme: "failure",
      });
      setDisabled(false);
    }
  };

  // Toggle to open of close the delete modal
  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Box>Modifier {originalTitle}</Box>
          <DeleteForeverIcon onClick={handleDeleteOpen} />
        </Stack>
      </DialogTitle>
      <DialogContent style={{ paddingTop: "5px" }}>
        <Box sx={{ p: 2, maxWidth: "sm", margin: "0 auto" }}>
          <form id="modifyForm" onSubmit={handleSubmit}>
            <Stack direction="column" spacing={2}>
              <TextField
                id="name"
                name="name"
                label="Nom"
                placeholder="Oeufs"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                multiline
                minRows={2}
                id="description"
                name="description"
                label="Description"
                placeholder="Oeufs de poule bio"
                value={content}
                required
                onChange={(e) => setContent(e.target.value)}
              />
              <ImageFilePicker
                setImageFile={setImageFile}
                setImagePreview={setImagePreview}
                required={false}
                setImageModified={setImageModified}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: 250,
                    borderRadius: 8,
                  }}
                />
              )}
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
          Modifier
        </Button>
      </DialogActions>

      <Delete
        open={deleteOpen}
        handleDeleteClose={handleDeleteClose}
        handleModifyClose={handleClose}
        publicationId={publicationId}
        title={originalTitle}
        imagePublicId={imagePublicId}
        setPublications={setPublications}
      />
    </Dialog>
  );
}

export default Modify;
