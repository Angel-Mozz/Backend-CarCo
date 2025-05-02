const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const e = require("express");
const port = process.env.PORT;
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/carco", require("./routes/carRoutes"));
app.use("/api/carco/users", require("./routes/userRoutes"));
app.use("/api/carco/login", require("./routes/authRoutes"));
app.use("/api/carco/forms", require("./routes/contactFormRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));
