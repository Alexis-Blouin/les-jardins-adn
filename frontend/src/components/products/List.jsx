import Masonry from "@mui/lab/Masonry";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Modify from "./Modify";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import { useState } from "react";

function List({ products, setProducts }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modifyOpen, setModifyOpen] = useState(false);

  const handleModifyOpen = (product) => {
    setSelectedProduct(product);
    setModifyOpen(true);
  };

  const handleModifyClose = () => {
    setSelectedProduct(null);
    setModifyOpen(false);
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
                <Typography variant="h4" component="h1" gutterBottom>
                  {product.productName}
                </Typography>
                <EditSquareIcon onClick={() => handleModifyOpen(product)} />
              </Stack>
              <Typography variant="body1" gutterBottom>
                {product.productDescription}
              </Typography>
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
    </Box>
  );
}

export default List;
