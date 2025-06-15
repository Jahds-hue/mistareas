const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // 👈 Esto hace posible filtrar por usuario
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};
