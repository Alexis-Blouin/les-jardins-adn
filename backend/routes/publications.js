const express = require("express");
const router = express.Router();
const db = require("../db");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const streamifier = require("streamifier");
const authenticate = require("../middleware/authenticate");

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() }); // Use memory storage for multer

// Get all publications
router.get("/get", async (req, res) => {
  try {
    const [rows] = await db.query(
      `select publicationId, publicationTitle, publicationContent, publicationImageURL, publicationImagePublicId
      from publications`,
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Add a new publication with an image upload
router.post(
  "/add",
  authenticate,
  upload.single("publicationImage"),
  async (req, res) => {
    try {
      const publicationTitle = req.body.publicationTitle;
      const publicationContent = req.body.publicationContent;
      const publicationImage = req.file;

      const publication = await selectOnePublication(publicationTitle);
      // TODO maybe we don't care if there are two publication with the same name
      if (publication) {
        res.json({
          publicationId: publication.publicationId,
          success: false,
          message: "Publication with the same name already exists",
        });
      } else {
        // Upload the image to Cloudinary and get the URL
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "publications",
            },
            (err, result) => {
              if (err) reject(err);
              else resolve(result);
            },
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
        // Get the secure URL and public id of the uploaded image
        const publicationImageURL = result.secure_url;
        const publicationImagePublicId = result.public_id;

        // Insert the publication into the database with the image URL
        const [publicationsResult] = await db.query(
          `insert into publications (publicationTitle, publicationContent, publicationImageURL, publicationImagePublicId)
          values (?, ?, ?, ?)`,
          [
            publicationTitle,
            publicationContent,
            publicationImageURL,
            publicationImagePublicId,
          ],
        );

        // Return the newly added publication's ID and image URL
        res.json({
          publicationId: publicationsResult.insertId,
          publicationImageURL: publicationImageURL,
          publicationImagePublicId: publicationImagePublicId,
          success: true,
          message: "Publication ajoutée avec succès!",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
);

router.patch(
  "/modify",
  authenticate,
  upload.single("publicationImage"),
  async (req, res) => {
    try {
      const publicationId = req.body.publicationId;
      const publicationTitle = req.body.publicationTitle;
      const publicationContent = req.body.publicationContent;
      const publicationOldImageURL = req.body.publicationImageURL;
      const publicationOldImagePublicId = req.body.publicationImagePublicId;
      const publicationImage = req.file ?? null;

      // const publication = await selectOnePublication(publicationTitle);
      // if (publication && publication.publicationId !== publicationId) {
      //   res.json({
      //     success: false,
      //     message: "Publication with the same name already exists",
      //   });
      // } else {
      let result = null;

      if (publicationImage) {
        // Upload the new image to Cloudinary
        result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "publications",
            },
            (err, result) => {
              if (err) reject(err);
              else resolve(result);
            },
          );

          streamifier.createReadStream(publicationImage.buffer).pipe(stream);
        });
      }

      // Keep the old image if no new image was provided
      const publicationNewImageURL = result
        ? result.secure_url
        : publicationOldImageURL;
      const publicationNewImagePublicId = result
        ? result.public_id
        : publicationOldImagePublicId;

      await db.query(
        `update publications set publicationTitle = ?, publicationContent = ?, publicationImageURL = ?, publicationImagePublicId = ?
         where publicationId = ?`,
        [
          publicationTitle,
          publicationContent,
          publicationNewImageURL,
          publicationNewImagePublicId,
          publicationId,
        ],
      );

      // Delete the old image from Cloudinary if the image changed
      if (publicationImage) {
        await cloudinary.uploader.destroy(publicationOldImagePublicId);
      }

      res.json({
        success: true,
        publicationImageURL: publicationNewImageURL,
        publicationImagePublicId: publicationNewImagePublicId,
        message: "Publication modifiée avec succès!",
      });
      // }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
);

router.delete("/delete", authenticate, async (req, res) => {
  try {
    const publicationId = req.query.publicationId;
    const publicationImagePublicId = req.query.publicationImagePublicId;

    await db.query(`delete from publications where publicationId = ?`, [
      publicationId,
    ]);

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(publicationImagePublicId);

    res.json({
      success: true,
      message: "Publication supprimée avec succès",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

async function selectOnePublication(publicationTitle) {
  try {
    const [result] = await db.query(
      `select publicationId from publications
      where publicationTitle = ?`,
      [publicationTitle],
    );
    return result.length > 0 ? result[0] : null;
  } catch (err) {
    console.error(err);
    return {};
  }
}
