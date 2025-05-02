const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      console.error("Error al verificar token:", error.message);
      throw new Error("Token no válido");
    }
  } else {
    res.status(401);
    throw new Error("No autorizado, no hay token");
  }
});

// admins
const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  res.status(403);
  throw new Error("Acceso denegado: solo administradores");
};

// admins o contributors
const adminOrContributor = (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.user.isContributor)) {
    return next();
  }
  res.status(403);
  throw new Error(
    "Acceso denegado: se requiere ser administrador o colaborador"
  );
};

module.exports = {
  authenticate,
  adminOnly,
  adminOrContributor,
};
