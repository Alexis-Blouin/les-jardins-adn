const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Get the hashed password of the current account to compare them
    const [rows] = await db.query(
      `select accountId, accountEmail, accountPassword, accountIsAdmin from accounts where accountEmail = ?`,
      [email],
    );
    if (rows.length > 0) {
      const account = rows[0];
      // Compare the two passwords
      const match = await bcrypt.compare(password, account.accountPassword);

      // In case of a no match
      if (!match) {
        res.json({
          success: false,
          message: "Courriel ou mot de passe incorrect",
        });
        return;
      }

      // Else, we can sign in the user by creating a connection token
      const token = jwt.sign(
        {
          accountId: account.accountId,
          accountEmail: account.accountEmail,
          accountIsAdmin: account.accountIsAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      // TODO check to make sure it still work when deploying to production (secure: true)
      // Creation of the cookies
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        success: true,
        message: "Connexion réussie",
      });
    } else {
      res.json({
        success: false,
        message: "Courriel ou mot de passe incorrect",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// TODO Modify to allow admin accounts
router.post("/create-account", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query(
      `select accountId from accounts where accountEmail = ?`,
      [email],
    );

    if (rows.length > 0) {
      res.json({
        success: false,
        message: "Un compte avec ce courriel existe déjà",
      });
    } else {
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await db.query(
        `insert into accounts (accountEmail, accountPassword) values (?, ?)`,
        [email, hashedPassword],
      );

      res.json({
        success: true,
        message: "Compte créé avec succès",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post("/logout", async (req, res) => {
  // Clears the cookies to disconnect the user
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.json({ success: true, message: "Déconnexion réussie" });
});

router.get("/me", authenticate, (req, res) => {
  // If no account ID, the session is not connected
  if (!req.accountId) {
    return res.json({ success: false });
  }

  res.json({
    success: true,
    accountId: req.accountId,
    accountEmail: req.accountEmail,
    accountIsAdmin: req.accountIsAdmin,
  });
});

module.exports = router;
