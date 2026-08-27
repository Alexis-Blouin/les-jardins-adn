import Masonry from "@mui/lab/Masonry";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Modify from "./Modify";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import { useState } from "react";
import ProtectedRoute from "../ProtectedRoute";
import Add from "../reservations/Add";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

function List({ products, setProducts, setReservations, user }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [addReservationOpen, setAddReservationOpen] = useState(false);

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
      <Masonry
        columns={{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
        }}
        spacing={2}
      >
        {products.map((product) => (
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
                  ) : (
                    <BookmarkAddIcon
                      onClick={() => handleAddReservationOpen(product)}
                    />
                  ))}
              </Stack>
              <Typography variant="body1">
                {product.productDescription}
              </Typography>
              {product.productIsAvailable ? (
                <Typography variant="body1">
                  Disponible à {Number(product.productPrice).toFixed(2)}${" / "}
                  {product.productPriceUnit}
                </Typography>
              ) : (
                <Typography variant="body1">Indisponible</Typography>
              )}
              <img src={product.productImageURL} alt={product.productName} />
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
        open={addReservationOpen}
        handleClose={handleAddReservationClose}
      />
    </Box>
  );
}

export default List;
