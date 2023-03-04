import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", postRoutes);
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("HELLO my api");
});

const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.CONNECTION_URL_MONGODB)
  .then(() => app.listen(PORT, () => console.log(`server running on Port: ${PORT}`)))
  .catch((error) => console.log(error.message));
