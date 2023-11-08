const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const {upload}=require("./server");


const app = express();

const adminRouter = require("./routes/adminstratorRoutes");
const patientRouter = require("./routes/patientRoutes");

//const patientRouter = require("./routes/patientRoutes");
const doctorRouter = require("./routes/doctorRoutes");
const packageRouter = require("./routes/packageRoutes");
//const apiRouter = require("./routes/api");

//1) middleware
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); // middleware is function to modify incoming requested data
app.use(express.static(`${__dirname}/public`)); // to serve static files
app.use(cors()); // to allow all cors requests


//save file to database
app.post('/upload', upload.array("files", 3), (req, res) => {
  const fileIds = req.files.map(file => file.id);
  res.json({
    fileIds: fileIds,
    msg: 'file uploaded successfully'
  });
});


//2) routes
app.use("/admins", adminRouter);
app.use("/doctors", doctorRouter);
app.use("/patients", patientRouter);
app.use("/users", require("./routes/userRoute"));
app.use("/packages", packageRouter);
app.use('/conversations', require('./routes/conversationsRoutes'));
app.use('/messages', require('./routes/messagesRoutes'));
app.use("/api", require("./routes/api"));

module.exports = app;