import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { styled } from "@mui/material/styles";
import FormData from "form-data";
import axios from "axios";
import toast from "react-simple-toasts";
import ImageFilePicker from "../inputs/ImageFilePicker";

const { useState } = require("react");

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

function Add({ setProducts }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabled(true); // Disable the submit button to prevent multiple submissions

    // Create a FormData object to send the product data, including the image file
    const formData = new FormData();
    formData.append("productName", name);
    formData.append("productDescription", description);
    formData.append("productImage", imageFile, imageFile.name);

    try {
      const res = await axios.post(
        "http://localhost:8081/products/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // Update the products list in the parent component with the newly added product
      const newProduct = {
        productId: res.data.productId,
        productName: name,
        productDescription: description,
        productImageURL: res.data.productImageURL,
      };
      setProducts((prevProducts) => [...prevProducts, newProduct]);

      toast(res.data.message, { theme: "success" });

      // Reset the form fields and state after successful submission
      setDisabled(false);
      setName("");
      setDescription("");
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      toast("Erreur lors de l'ajout du produit.", { theme: "failure" });
      setDisabled(false);
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: "sm", margin: "0 auto" }}>
      <form id="addForm" onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
          <TextField
            id="name"
            name="name"
            label="name"
            placeholder="Oeufs"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="description"
            name="description"
            label="description"
            placeholder="Oeufs de poule bio"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
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
    </Box>
  );
}

export default Add;
