const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
});

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin, isContributor } = req.body;
  logger = [];

  if (!name) logger.push("Falta el nombre del usuario");
  if (!email) logger.push("Falta el email del usuario");
  if (!password) logger.push("Falta el password del usuario");

  if (logger.length > 0) {
    return res.status(400).json({ logger });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(400)
      .json({ mensaje: "El usuario ya existe con ese email" });
  }

  //encryptiomn
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isAdmin: isAdmin || false,
    isContributor: isContributor || false,
  });
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    isContributor: user.isContributor,
  });
});

const modifyUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Usuario no encontrado");
  }

  const { email, password } = req.body;

  if (email && email !== user.email) {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ mensaje: "El usuario ya existe con ese email" });
    }
  }

  if (password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
  }

  const userUpdate = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(userUpdate);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Usuario no encontrado");
  }

  await user.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getUsers,
  createUser,
  modifyUser,
  deleteUser,
};
