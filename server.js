const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const dbConnection = require("./config/database");
const courseRoute = require("./Routes/courseRoute");
const categoryRoute = require("./Routes/categoryRoute");

//database connection
dbConnection();

//express app
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

//routr mount
app.use("/api/v1/courses", courseRoute);
app.use("/api/v1/categories", categoryRoute);

app.all("*", (req, res, next) => {
  const err = new Error(`There is no such route: ${req.originalUrl}`);
  next(err.message);
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  res.status(400).json({ err });
});
//listen server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`app running on this ${PORT}`);
});
