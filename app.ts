import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";

import bodyParser from "body-parser";
const Routes = require("./routes/route");

const app: Application = express();
const port: number = 3001;

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
mongoose
  .connect("mongodb://0.0.0.0:27017/DB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/", Routes);

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
