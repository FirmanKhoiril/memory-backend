import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";

const app = express();
const router = express.Router();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", postRoutes);

app.use("/.netlify/functions/api", router);
module.exports.handler = serverless(app);

const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.CONNECTION_URL_MONGODB)
  .then(() => app.listen(PORT, () => console.log(`server running on Port: ${PORT}`)))
  .catch((error) => console.log(error.message));
