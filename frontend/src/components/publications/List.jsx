import Masonry from "@mui/lab/Masonry";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Modify from "./Modify";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import { useState } from "react";

function List({ publications, setPublications, user }) {
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [modifyOpen, setModifyOpen] = useState(false);

  // Toggles to open of close the modify and reserve modal
  // Also sets the publication once opened
  const handleModifyOpen = (publication) => {
    setSelectedPublication(publication);
    setModifyOpen(true);
  };

  const handleModifyClose = () => {
    setSelectedPublication(null);
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
        sx={{ ml: 0 }}
      >
        {publications.map((publication) => (
          <Paper>
            <Stack direction="column" spacing={2} sx={{ p: 2 }}>
              <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: "space-between" }}
              >
                <Typography variant="h4" component="h1">
                  {publication.publicationTitle}
                </Typography>
                {user && user.accountIsAdmin && (
                  <EditSquareIcon
                    onClick={() => handleModifyOpen(publication)}
                  />
                )}
              </Stack>
              <Typography variant="body1">
                {publication.publicationContent}
              </Typography>
              <img
                class="publication-image"
                src={publication.publicationImageURL}
                alt={publication.publicationTitle}
              />
            </Stack>
          </Paper>
        ))}
      </Masonry>

      <Modify
        publication={selectedPublication}
        setPublications={setPublications}
        open={modifyOpen}
        handleClose={handleModifyClose}
      />
    </Box>
  );
}

export default List;
