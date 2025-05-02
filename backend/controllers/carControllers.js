const asyncHandler = require("express-async-handler");
const Car = require("../models/carModels");

const getCars = asyncHandler(async (req, res) => {
  const cars = await Car.find();
  res.status(200).json({ cars });
});

const createCar = asyncHandler(async (req, res) => {
  const { model, price, trade, image, type } = req.body;
  errores = [];

  if (!model) errores.push("Falta modelo del carro");
  if (!price) errores.push("Falta precio del carro");
  if (!trade) errores.push("Falta el precio de trade del carro");
  if (!image) errores.push("Falta url de la imagen del carro");

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  const car = await Car.create({ model, price, trade, image, type });
  res.status(201).json({ car });
});

const modifyCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) {
    res.status(404);
    throw new Error("Carro no encontrado");
  }

  const carUpdate = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(carUpdate);
});

const deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) {
    res.status(404);
    throw new Error("Carro no encontrado");
  }

  await car.deleteOne();

  res.status(200).json({ id: req.params.id });
});
module.exports = {
  getCars,
  createCar,
  modifyCar,
  deleteCar,
};
