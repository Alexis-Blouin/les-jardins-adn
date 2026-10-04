import Masonry from "@mui/lab/Masonry";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Modify from "./Modify";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import { useState, useEffect } from "react";
import Add from "../reservations/Add";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function List({
  products,
  setProducts,
  setReservations,
  setAllReservations,
  user,
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [addReservationOpen, setAddReservationOpen] = useState(false);
  const [seeHiddenProducts, setSeeHiddenProducts] = useState(false);
  const [showingProducts, setShowingProducts] = useState([]);

  useEffect(() => {
    setShowingProducts(
      products.filter((product) => product.productHidden == seeHiddenProducts),
    );
  }, [products, seeHiddenProducts]);

  // Toggles to open of close the modify and reserve modal
  // Also sets the product once opened
  const handleModifyOpen = (product) => {
    setSelectedProduct(product);
    setModifyOpen(true);
  };

  const handleModifyClose = () => {
    setSelectedProduct(null);
    setModifyOpen(false);
  };

  const handleAddReservationOpen = (product) => {
    setSelectedProduct(product);
    setAddReservationOpen(true);
  };

  const handleAddReservationClose = () => {
    setSelectedProduct(null);
    setAddReservationOpen(false);
  };

  return (
    <Box sx={{ p: 2, maxWidth: "xl", margin: "0 auto" }}>
      {user && user.accountIsAdmin ? (
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={seeHiddenProducts}
                onChange={(e) => setSeeHiddenProducts(e.target.checked)}
              />
            }
            label="Voir les produits désactivés"
          />
        </FormGroup>
      ) : null}
      <Masonry
        columns={{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
        }}
        spacing={2}
        sx={{ ml: 0, mt: 2 }}
      >
        {showingProducts.map((product) => (
          <Paper>
            <Stack direction="column" spacing={2} sx={{ p: 2 }}>
              <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: "space-between" }}
              >
                <Typography variant="h4" component="h1">
                  {product.productName}
                </Typography>
                {user &&
                  (user.accountIsAdmin ? (
                    <EditSquareIcon onClick={() => handleModifyOpen(product)} />
                  ) : product.productIsAvailable ? (
                    <BookmarkAddIcon
                      onClick={() => handleAddReservationOpen(product)}
                    />
                  ) : null)}
              </Stack>
              <Typography variant="body1">
                {product.productDescription}
              </Typography>
              {product.productHidden ? (
                <Typography variant="body1">Désactivé</Typography>
              ) : product.productIsAvailable ? (
                <Typography variant="body1">
                  Disponible à {Number(product.productPrice).toFixed(2)}${" / "}
                  {product.productPriceUnit}
                </Typography>
              ) : (
                <Typography variant="body1">Indisponible</Typography>
              )}
              <img
                class="product-image"
                src={product.productImageURL}
                alt={product.productName}
              />
            </Stack>
          </Paper>
        ))}
      </Masonry>

      <Modify
        product={selectedProduct}
        setProducts={setProducts}
        open={modifyOpen}
        handleClose={handleModifyClose}
      />

      <Add
        product={selectedProduct}
        setReservations={setReservations}
        setAllReservations={setAllReservations}
        open={addReservationOpen}
        handleClose={handleAddReservationClose}
        user={user}
      />
    </Box>
  );
}

export default List;
