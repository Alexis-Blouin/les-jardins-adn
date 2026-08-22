const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.json({ success: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.accountId = decoded.accountId;
    req.accountEmail = decoded.accountEmail;
    req.isAdmin = decoded.isAdmin;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authenticate;
