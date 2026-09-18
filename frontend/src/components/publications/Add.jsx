import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { styled } from "@mui/material/styles";
import FormData from "form-data";
import axios from "axios";
import toast from "react-simple-toasts";
import ImageFilePicker from "../inputs/ImageFilePicker";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import FormPaper from "../FormPaper";

// Hidden input for file upload, styled to be visually hidden but still accessible
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Add({ setPublications }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabled(true); // Disable the submit button to prevent multiple submissions

    // Create a FormData object to send the publication data, including the image file
    const formData = new FormData();
    formData.append("publicationTitle", title);
    formData.append("publicationContent", content);
    formData.append("publicationImage", imageFile, imageFile.name);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/publications/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // Update the publications list in the parent component with the newly added publication
      const newPublication = {
        publicationId: res.data.publicationId,
        publicationTitle: title,
        publicationContent: content,
        publicationImageURL: res.data.publicationImageURL,
        publicationImagePublicId: res.data.publicationImagePublicId,
      };
      setPublications((prevPublications) => [
        ...prevPublications,
        newPublication,
      ]);

      toast(res.data.message, { theme: "success" });

      // Reset the form fields and state after successful submission
      setDisabled(false);
      setTitle("");
      setContent("");
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      toast("Erreur lors de l'ajout du produit.", { theme: "failure" });
      setDisabled(false);
    }
  };

  return (
    <FormPaper>
      <form id="addForm" onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
          <TextField
            id="title"
            name="title"
            label="Titre"
            placeholder="Nouveau"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            multiline
            minRows={2}
            id="content"
            name="content"
            label="Contenu"
            placeholder="Nouvelles installations"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
          />
          <ImageFilePicker
            setImageFile={setImageFile}
            setImagePreview={setImagePreview}
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={disabled}
          >
            Ajouter
          </Button>
        </Stack>
      </form>
    </FormPaper>
  );
}

export default Add;
