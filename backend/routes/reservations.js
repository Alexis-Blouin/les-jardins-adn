const express = require("express");
const router = express.Router();
const db = require("../db");
const authenticate = require("../middleware/authenticate");

router.get("/get", authenticate, async (req, res) => {
  try {
    // Query to get all the reservations and join the accounts and products tables
    const [rows] = await db.query(
      `select r.reservationId, r.reservationQuantity, r.reservationPickupTime, a.accountEmail, p.productName, p.productPrice, p.productPriceUnit
      from reservations r
      join accounts a on r.accountId = a.accountId
      join products p on r.productId = p.productId
      where r.accountId = ? order by reservationPickupTime`,
      [req.accountId],
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post("/add", authenticate, async (req, res) => {
  try {
    const reservationQuantity = req.body.quantity;
    const reservationPickupTime = req.body.pickupTime;
    const productId = req.body.productId;

    const [reservationsResult] = await db.query(
      `insert into reservations (reservationQuantity, reservationPickupTime, productId, accountId) values (?, ?, ?, ?)`,
      [reservationQuantity, reservationPickupTime, productId, req.accountId],
    );

    res.json({
      reservationId: reservationsResult.insertId,
      success: true,
      message: "La réservation est enregistrée",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// TODO
// router.patch("/modify", authenticate, async (req, res) => {
//   try {
//     const reservationId = req.body.reservationId;
//     const reservationTitle = req.body.reservationTitle;
//     const reservationContent = req.body.reservationContent;
//     const reservationExample = req.body.reservationExample;

//     const reservation = await selectOneNote(reservationTitle, req.accountId);
//     if (reservation && reservation.reservationId !== reservationId) {
//       res.json({
//         success: false,
//         message: "Note with the same title already exists",
//       });
//     } else {
//       await db.query(
//         `update reservations set reservationTitle = ?, reservationContent = ?, reservationExample = ? where reservationId = ? and accountId = ?`,
//         [
//           reservationTitle,
//           reservationContent,
//           reservationExample,
//           reservationId,
//           req.accountId,
//         ],
//       );
//       res.json({
//         success: true,
//         message: "Note updated successfully",
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// TODO
// router.delete("/delete", authenticate, async (req, res) => {
//   try {
//     const reservationId = req.query.reservationId;
//     await db.query(
//       `delete from reservations where reservationId = ? and accountId = ?`,
//       [reservationId, req.accountId],
//     );
//     res.json({
//       success: true,
//       message: "Note deleted successfully",
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;
