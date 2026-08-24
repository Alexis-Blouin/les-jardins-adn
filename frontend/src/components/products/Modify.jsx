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

function Modify({ product, setProducts, open, handleClose }) {
  const [productId, setProductId] = useState(null);
  const [name, setName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setProductImageURL] = useState("");
  const [imagePublicId, setProductImagePublicId] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [price, setPrice] = useState(null);
  const [priceUnit, setPriceUnit] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [imageModified, setImageModified] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Update form fields when the product changes
  useEffect(() => {
    if (product) {
      setProductId(product.productId);
      setName(product.productName);
      setOriginalName(product.productName);
      setDescription(product.productDescription);
      setProductImageURL(product.productImageURL);
      setProductImagePublicId(product.productImagePublicId);
      setImagePreview(product.productImageURL);
      setIsAvailable(product.productIsAvailable);
      setPrice(product.productPrice);
      setPriceUnit(product.productPriceUnit);
    }
  }, [product]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabled(true); // Disable the submit button to prevent multiple submissions

    // Create a FormData object to send the product data, including the image file
    const formData = new FormData();
    formData.append("productId", productId); // Include the product ID for updating
    formData.append("productName", name);
    formData.append("productDescription", description);
    formData.append("productImageURL", imageURL);
    formData.append("productImagePublicId", imagePublicId); // Include the current image public id for deletion
    formData.append("productIsAvailable", isAvailable ? 1 : 0);
    formData.append("productPrice", price);
    formData.append("productPriceUnit", priceUnit);

    if (imageModified) {
      formData.append("productImage", imageFile, imageFile.name);
    }

    try {
      const res = await axios.patch(
        "http://localhost:8081/products/modify",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // Modify the products list in the parent component with the newly added product
      const modifiedProduct = {
        productId: productId,
        productName: name,
        productDescription: description,
        productImageURL: res.data.productImageURL,
        productImagePublicId: res.data.productImagePublicId,
        productIsAvailable: isAvailable,
        productPrice: price,
        productPriceUnit: priceUnit,
      };
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.productId === product.productId ? modifiedProduct : p,
        ),
      );

      toast(res.data.message, { theme: "success" });

      handleClose(); // Close the dialog after successful submission

      // Reset the form fields and state after successful submission
      setDisabled(false);
      setName("");
      setDescription("");
      setImageFile(null);
      setImagePreview(null);
      setIsAvailable(true);
      setPrice(0.0);
      setPriceUnit("");
    } catch (err) {
      console.error(err);
      toast("Erreur lors de la modification du produit.", { theme: "failure" });
      setDisabled(false);
    }
  };

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
          <Box>Modifier {originalName}</Box>
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
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="description"
                name="description"
                label="Description"
                placeholder="Oeufs de poule bio"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAvailable}
                      onChange={(e) => setIsAvailable(e.target.checked)}
                    />
                  }
                  label="Disponible"
                />
              </FormGroup>
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <TextField
                  id="price"
                  name="price"
                  label="Prix"
                  type="number"
                  placeholder="2.50"
                  value={price}
                  required
                  slotProps={{
                    htmlInput: {
                      min: 0,
                      step: 0.01,
                    },
                  }}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <Typography variant="h3">/</Typography>
                <TextField
                  id="priceUnit"
                  name="priceUnit"
                  label="Unité"
                  placeholder="Unité"
                  value={priceUnit}
                  required
                  onChange={(e) => setPriceUnit(e.target.value)}
                />
              </Stack>
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
        productId={productId}
        name={originalName}
        imagePublicId={imagePublicId}
        setProducts={setProducts}
      />
    </Dialog>
  );
}

export default Modify;
