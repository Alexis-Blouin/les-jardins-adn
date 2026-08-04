import Masonry from "@mui/lab/Masonry";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function List({ products }) {
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
              <Typography variant="h4" component="h1" gutterBottom>
                {product.productName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {product.productDescription}
              </Typography>
              <img src={product.productImageURL} alt={product.productName} />
            </Stack>
          </Paper>
        ))}
      </Masonry>
    </Box>
  );
}

export default List;
