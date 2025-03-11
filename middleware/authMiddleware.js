console.log("authMiddleware.js è stato caricato correttamente!");

const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  console.log("Middleware authenticate eseguito!"); // Debug log
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token mancante" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.customerId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token non valido" });
  }
};

console.log("Esportazione authenticate da authMiddleware.js:", typeof authenticate);

module.exports = authenticate;  // Deve essere esportato così!
