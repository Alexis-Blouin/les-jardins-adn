import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
const { useState } = require("react");
import { styled } from "@mui/material/styles";

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

function ImageFilePicker({ setImageFile, setImagePreview }) {
  // Handle image file selection and create a preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setImageFile(file);

    // Create a local preview
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="outlined"
      tabIndex={-1}
      startIcon={<CloudUploadOutlinedIcon />}
    >
      Choisir une image
      <VisuallyHiddenInput
        type="file"
        accept="image/*"
        required
        onChange={handleImageChange}
      />
    </Button>
  );
}

export default ImageFilePicker;
