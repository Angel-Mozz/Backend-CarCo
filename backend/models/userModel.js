const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Favor de ingresar el nombre del usuario"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Favor de ingresar el nombre del usuario"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Favor de ingresar una contraseña"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isContributor: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema, "users");
