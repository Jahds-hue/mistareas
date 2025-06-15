const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: 6,
  },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
