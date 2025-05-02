const mongoose = require("mongoose");

const contactFormSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Por favor escribe tu nombre"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Por favor escribe tu apellido"],
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Por favor escribe tu email"],
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    info: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ContactForm",
  contactFormSchema,
  "contactForm"
);
