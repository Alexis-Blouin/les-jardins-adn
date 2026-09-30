const express = require("express");
const router = express.Router();
const db = require("../db");
const authenticate = require("../middleware/authenticate");

// Get the landing page content
router.get("/getLandingPageContent", async (req, res) => {
  try {
    const [rows] = await db.query(
      `select landingPageContent from config where configId = 1`,
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Update the landing page content
router.put("/updateLandingPageContent", authenticate, async (req, res) => {
  const { landingPageContent } = req.body;
  try {
    await db.query(
      `update config set landingPageContent = ? where configId = 1`,
      [JSON.stringify(landingPageContent)],
    );
    res.json({ message: "Landing page content updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
