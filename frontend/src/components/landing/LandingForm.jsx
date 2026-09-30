import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Stack,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import toast from "react-simple-toasts";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

function LandingForm({
  landingPageContent,
  setLandingPageContent,
  open,
  setOpen,
}) {
  const [currentLandingPageContent, setCurrentLandingPageContent] =
    useState(landingPageContent);

  // Keep the local copy synchronized with the parent
  useEffect(() => {
    setCurrentLandingPageContent(landingPageContent);
  }, [landingPageContent]);

  const handleClose = () => {
    // Discard local changes
    setCurrentLandingPageContent(landingPageContent);
    setOpen(false);
  };

  const handleAddSection = () => {
    setCurrentLandingPageContent((prev) => [
      ...prev,
      {
        title: "",
        text: "",
      },
    ]);
  };

  const handleRemoveSection = (index) => {
    setCurrentLandingPageContent((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSectionChange = (index, field, value) => {
    setCurrentLandingPageContent((prev) =>
      prev.map((section, i) =>
        i === index
          ? {
              ...section,
              [field]: value,
            }
          : section,
      ),
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/config/updateLandingPageContent`,
      {
        landingPageContent: currentLandingPageContent,
      },
    );

    toast(res.data.message, { theme: "success" });

    setLandingPageContent(currentLandingPageContent);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
    >
      <DialogTitle>Modifier l'accueil</DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ p: 2 }}>
          <form id="modifyForm" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {currentLandingPageContent.map((section, index) => (
                <Box key={index}>
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <strong>Section {index + 1}</strong>

                      <IconButton
                        color="error"
                        onClick={() => handleRemoveSection(index)}
                        aria-label="Supprimer la section"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>

                    <TextField
                      label="Titre"
                      value={section.title}
                      onChange={(event) =>
                        handleSectionChange(index, "title", event.target.value)
                      }
                      fullWidth
                      required
                    />

                    <TextField
                      label="Texte"
                      value={section.text}
                      onChange={(event) =>
                        handleSectionChange(index, "text", event.target.value)
                      }
                      multiline
                      minRows={4}
                      fullWidth
                      required
                    />
                  </Stack>

                  {index < currentLandingPageContent.length - 1 && (
                    <Divider sx={{ mt: 3 }} />
                  )}
                </Box>
              ))}

              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddSection}
              >
                Ajouter une section
              </Button>
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
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LandingForm;
