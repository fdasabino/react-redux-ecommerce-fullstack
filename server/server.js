const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

//app
const app = express();

//port
const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`Server running on port: ${process.env.PORT}`)
);

//db
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());

// routes middleware - auto importing
readdirSync("./routes").map((route) =>
  app.use("/api", require(`./routes/${route}`))
);
