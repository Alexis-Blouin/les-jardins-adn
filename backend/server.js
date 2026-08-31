// server.js
// Import required modules
const express = require("express"); // Express framework for handling HTTP requests
const mysql = require("mysql2"); // MySQL2 client for Node.js
const cors = require("cors"); // For web security
const cookieParser = require("cookie-parser"); // For parsing cookies

require("dotenv").config();

// Allowed CORS origins
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

// Create an instance of express
const app = express();
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Create a connection to the MySQL database
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

const port = process.env.LISTENING_PORT || 8081;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
