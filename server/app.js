const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const adminRouter = require("./routes/adminstratorRoutes");
const patientRouter = require("./routes/patientRoutes");

//const patientRouter = require("./routes/patientRoutes");
const doctorRouter = require("./routes/doctorRoutes");
const packageRouter = require("./routes/packageRoutes");

//1) middleware
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); // middleware is function to modify incoming requested data
app.use(express.static(`${__dirname}/public`)); // to serve static files
app.use(cors()); // to allow all cors requests

//2) routes

app.use("/admins", adminRouter);

app.use("/doctors", doctorRouter);
app.use("/patients", patientRouter);
app.use("/users", require("./routes/userRoute"));
app.use("/packages", packageRouter);

module.exports = app;
