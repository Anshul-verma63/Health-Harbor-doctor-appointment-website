import express from "express";
import morgan from "morgan";
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

//rest object
const app = express();

//dotenv configuration
dotenv.config();
const PORT = process.env.PORT || 9000;

//data base connection
connectDb();

//middleware
app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

//rest api
app.use("/api/v1/user", userRoutes);

//create server
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`.bgCyan.white);
});
