const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
  {
    model: {
      type: String,
      required: [true, "Por favor escribe el modelo del carro"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Por favor escribe el precio"],
      trim: true,
    },
    trade: {
      type: String,
      required: [true, "Por favor escribe el precio"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Por favor inserta una imagen"],
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carSchema, "cars");
