const asyncHandler = require("express-async-handler");
const ContactForm = require("../models/contactFormModel");

const getContactForms = asyncHandler(async (req, res) => {
  const forms = await ContactForm.find();
  res.status(200).json({ forms });
});

const createForm = asyncHandler(async (req, res) => {
  const { firstName, lastName, email } = req.body;
  errores = [];

  if (!firstName) errores.push("Falta nombre");
  if (!lastName) errores.push("Falta apellido");
  if (!email) errores.push("Falta correo");

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  const contactForm = await ContactForm.create(req.body);
  res.status(201).json({ contactForm });
});

const modifyForm = asyncHandler(async (req, res) => {
  const contactForm = await ContactForm.findById(req.params.id);
  if (!contactForm) {
    res.status(404);
    throw new Error("Formulario no encontrado");
  }

  const contactFormUpd = await ContactForm.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(contactForm);
});

const deleteForm = asyncHandler(async (req, res) => {
  const contactForm = await ContactForm.findById(req.params.id);
  if (!contactForm) {
    res.status(404);
    throw new Error("Forms no encontrado");
  }

  await contactForm.deleteOne();

  res.status(200).json({ id: req.params.id });
});
module.exports = {
  getContactForms,
  createForm,
  modifyForm,
  deleteForm,
};
