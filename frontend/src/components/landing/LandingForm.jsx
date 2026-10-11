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
  Typography,
} from "@mui/material";
import toast from "react-simple-toasts";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

function LandingForm({
  landingPageContent,
  setLandingPageContent,
  openingHours,
  setOpeningHours,
  workingDays,
  open,
  setOpen,
}) {
  const [currentLandingPageContent, setCurrentLandingPageContent] =
    useState(landingPageContent);
  const [currentHours, setCurrentHours] = useState(
    Object.fromEntries(
      workingDays.map((day) => [day, [null, null, null, null]]),
    ),
  );

  // Keep the local copy synchronized with the parent
  useEffect(() => {
    setCurrentLandingPageContent(landingPageContent);
    setCurrentHours(openingHours);
  }, [landingPageContent, openingHours]);

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
        openingHours: currentHours,
      },
    );

    toast(res.data.message, { theme: "success" });

    setLandingPageContent(currentLandingPageContent);
    setOpeningHours(currentHours);
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
            <Typography variant="h4">Sections</Typography>
            <Stack spacing={2}>
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
                      <Typography variant="h5">Section {index + 1}</Typography>

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
            {currentHours["Lundi"] && (
              <>
                <Typography variant="h4" sx={{ mt: 2 }}>
                  Horaire
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={2}>
                    {workingDays.map((day) => (
                      <Stack key={day} spacing={1}>
                        <Typography variant="h5">{day}</Typography>

                        <Stack direction="column" spacing={2}>
                          {[
                            { index: 0, label: "Début" },
                            { index: 1, label: "Fin" },
                            { index: 2, label: "Début" },
                            { index: 3, label: "Fin" },
                          ].map(({ index, label }) => (
                            <TimePicker
                              sx={{ maxWidth: 150 }}
                              key={index}
                              label={label}
                              value={
                                currentHours[day][index]
                                  ? dayjs(
                                      `2000-01-01T${currentHours[day][index]}`,
                                    )
                                  : null
                              }
                              onChange={(newValue) => {
                                setCurrentHours((previousHours) => ({
                                  ...previousHours,
                                  [day]: previousHours[day].map((time, i) =>
                                    i === index
                                      ? newValue && newValue.isValid()
                                        ? newValue.format("HH:mm")
                                        : null
                                      : time,
                                  ),
                                }));
                              }}
                              views={["hours", "minutes"]}
                              format="HH:mm"
                              ampm={false}
                            />
                          ))}
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                </LocalizationProvider>
              </>
            )}
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
