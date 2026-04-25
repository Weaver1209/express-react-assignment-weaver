import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config';
import snipRoutes from "./routes/snip.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.db_url)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error(err));

app.use("/", snipRoutes);

app.listen(30000);