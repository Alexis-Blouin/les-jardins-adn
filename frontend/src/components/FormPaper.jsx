import Paper from "@mui/material/Paper";

function FormPaper({ children, sx = {}, ...props }) {
  return (
    <Paper
      sx={{
        mt: 2,
        p: 2,
        maxWidth: "sm",
        ml: {
          xs: 2,
          sm: "auto",
        },
        mr: {
          xs: 2,
          sm: "auto",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
}

export default FormPaper;
