const express = require("express");
const router = express.Router();
const db = require("../db");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const streamifier = require("streamifier");
// const authenticate = require("../middleware/authenticate");

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() }); // Use memory storage for multer

// Get all products
router.get("/get", async (req, res) => {
  try {
    const [rows] = await db.query(
      `select productId, productName, productDescription, productImageURL, productImagePublicId
      from products`,
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Add a new product with an image upload
router.post("/add", upload.single("productImage"), async (req, res) => {
  try {
    const productName = req.body.productName;
    const productDescription = req.body.productDescription;
    const productImage = req.file;

    const product = await selectOneProduct(productName);
    // TODO maybe we don't care if there are two product with the same name
    if (product) {
      res.json({
        productId: product.productId,
        success: false,
        message: "Product with the same name already exists",
      });
    } else {
      // Upload the image to Cloudinary and get the URL
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          },
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
      // Get the secure URL and public id of the uploaded image
      const productImageURL = result.secure_url;
      const productImagePublicId = result.public_id;

      // Insert the product into the database with the image URL
      const [productsResult] = await db.query(
        `insert into products (productName, productDescription, productImageURL, productImagePublicId) values (?, ?, ?, ?)`,
        [
          productName,
          productDescription,
          productImageURL,
          productImagePublicId,
        ],
      );

      // Return the newly added product's ID and image URL
      res.json({
        productId: productsResult.insertId,
        productImageURL: productImageURL,
        productImagePublicId: productImagePublicId,
        success: true,
        message: "Produit ajouté avec succès!",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.patch("/modify", upload.single("productImage"), async (req, res) => {
  try {
    const productId = req.body.productId;
    const productName = req.body.productName;
    const productDescription = req.body.productDescription;
    const productOldImageURL = req.body.productImageURL;
    const productOldImagePublicId = req.body.productImagePublicId;
    const productImage = req.file ?? null;

    // const product = await selectOneProduct(productName);
    // if (product && product.productId !== productId) {
    //   res.json({
    //     success: false,
    //     message: "Product with the same name already exists",
    //   });
    // } else {
    let result = null;

    if (productImage) {
      // Upload the new image to Cloudinary
      result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          },
        );

        streamifier.createReadStream(productImage.buffer).pipe(stream);
      });
    }

    // Keep the old image if no new image was provided
    const productNewImageURL = result ? result.secure_url : productOldImageURL;
    const productNewImagePublicId = result
      ? result.public_id
      : productOldImagePublicId;

    await db.query(
      `update products set productName = ?, productDescription = ?, productImageURL = ?, productImagePublicId = ? where productId = ?`,
      [
        productName,
        productDescription,
        productNewImageURL,
        productNewImagePublicId,
        productId,
      ],
    );

    // Delete the old image from Cloudinary if the image changed
    if (productImage) {
      await cloudinary.uploader.destroy(productOldImagePublicId);
    }

    res.json({
      success: true,
      productImageURL: productNewImageURL,
      productImagePublicId: productNewImagePublicId,
      message: "Produit modifié avec succès!",
    });
    // }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const noteId = req.query.noteId;
    await db.query(`delete from notes where noteId = ? and accountId = ?`, [
      noteId,
      req.accountId,
    ]);
    res.json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

async function selectOneProduct(productName) {
  try {
    const [result] = await db.query(
      `select productId from products
      where productName = ?`,
      [productName],
    );
    return result.length > 0 ? result[0] : null;
  } catch (err) {
    console.error(err);
    return {};
  }
}

/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};
