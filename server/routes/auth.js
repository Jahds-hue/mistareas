const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Registro
router.post("/register", async (req, res) => {
      console.log("👉 Se llamó /register");
  const { email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Usuario ya existe" });

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash });
    await user.save();

    res.status(201).json({ message: "Registrado correctamente" });
  } catch (err) {
     console.error("🔥 ERROR en /register:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Credenciales inválidas" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Credenciales inválidas" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

module.exports = router;
