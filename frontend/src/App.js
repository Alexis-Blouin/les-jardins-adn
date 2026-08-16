import logo from "./logo.svg";
import "./App.css";
import "react-simple-toasts/dist/style.css"; // Will give a warning, but works anyway.
import "react-simple-toasts/dist/theme/info.css";
import "react-simple-toasts/dist/theme/success.css";
import "react-simple-toasts/dist/theme/failure.css";
import { toastConfig } from "react-simple-toasts";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Masonry from "@mui/lab/Masonry";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import Stack from "@mui/material/Stack";
import logo_adn from "./images/logo.jpg";
import List from "./components/products/List";
import Landing from "./components/Landing";
import Add from "./components/products/Add";
import useAuth, { AuthProvider } from "./hooks/useAuth";
import CreateAccount from "./components/accounts/CreateAccount";
import Login from "./components/accounts/Login";
import Logout from "./components/accounts/Logout";
import ProtectedRoute from "./components/ProtectedRoute";

axios.defaults.withCredentials = true;

// specify the theme in toastConfig
toastConfig({
  theme: "dark",
  zIndex: 9999,
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#cecece",
      paper: "#ebebeb",
    },
    primary: {
      main: "#2c3e50",
      light: "#34495e",
      dark: "#1a252f",
    },
    secondary: {
      main: "#3498db",
      light: "#5dade2",
      dark: "#2980b9",
    },
    text: {
      primary: "#2c3e50",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1a1f2e", // deep navy, matches your primary dark
      paper: "#222b3a", // slightly lighter for cards/surfaces
    },
    primary: {
      main: "#5dade2", // your secondary light — pops on dark bg
      light: "#85c1e9",
      dark: "#3498db",
    },
    secondary: {
      main: "#3498db",
      light: "#5dade2",
      dark: "#2980b9",
    },
    text: {
      primary: "#ecf0f1", // soft white, easy on the eyes
      secondary: "#95a5a6", // muted gray for secondary text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const pages = [
  { name: "Produits", path: "/produits" },
  { name: "Ajouter", path: "/ajouter" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function App() {
  const [isDark, setIsDark] = React.useState(false);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent isDark={isDark} setIsDark={setIsDark} />
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent({ isDark, setIsDark }) {
  const [products, setProducts] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:8081/products/get")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Router>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box
                component="img"
                src={logo_adn}
                alt="Logo"
                sx={{
                  width: "40px",
                  height: "40px",
                  marginRight: "16px",
                  display: { xs: "none", md: "flex" },
                }}
              />
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Les Jardins ADN
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page.name}
                      component={Link}
                      to={page.path}
                      onClick={handleCloseNavMenu}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {page.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box
                component="img"
                src={logo_adn}
                alt="Logo"
                sx={{
                  width: "40px",
                  height: "40px",
                  marginRight: "16px",
                  display: { xs: "flex", md: "none" },
                }}
              />
              <Typography
                variant="h5"
                noWrap
                component={Link}
                to="/"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Jardins ADN
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    component={Link}
                    to={page.path}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/produits"
              element={
                <List
                  products={products}
                  setProducts={setProducts}
                  user={user}
                />
              }
            />
            <Route
              path="/ajouter"
              element={
                <ProtectedRoute>
                  <Add setProducts={setProducts} />
                </ProtectedRoute>
              }
            />
            <Route path="/compte/connexion" element={<Login />} />
            <Route
              path="/compte/deconnexion"
              element={
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/compte/creer-compte"
              element={
                <ProtectedRoute>
                  <CreateAccount />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
        <Box
          component="footer"
          sx={{
            py: 2,
            px: 2,
            mt: 4,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
            <Typography variant="body1">
              @2026 Les Jardins ADN. Tous droits réservés.
            </Typography>
            {user ? (
              <Link component={RouterLink} to="/compte/deconnexion">
                <Typography variant="body1">Déconnexion</Typography>
              </Link>
            ) : (
              <Link component={RouterLink} to="/compte/connexion">
                <Typography variant="body1">Administrateur</Typography>
              </Link>
            )}
          </Stack>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
