// server.js
// Import required modules
const express = require("express"); // Express framework for handling HTTP requests
const mysql = require("mysql2"); // MySQL2 client for Node.js
const cors = require("cors"); // For web security
const cookieParser = require("cookie-parser"); // For parsing cookies

// Create an instance of express
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Create a connection to the MySQL database
require("dotenv").config();
const db = require("./db");

app.get("/", (req, res) => {
  res.send("Hello from Node.js server!");
});

// import routes
const productsRoutes = require("./routes/products");
const accountsRoutes = require("./routes/accounts");
const reservationsRoutes = require("./routes/reservations");

// use routes
app.use("/products", productsRoutes);
app.use("/accounts", accountsRoutes);
app.use("/reservations", reservationsRoutes);

const port = 8081;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
