import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/register.js";
import { register } from "./controllers/auth.js";
import { registerEmployee } from "./controllers/employee.js";
import { listEmployee } from "./controllers/employee.js";
import { deleteEmployee } from "./controllers/employee.js";
const db_url = process.env.DATABASE_URL;
dotenv.config();



const app = express(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
/* ROUTES WITH FILES */
app.post("/auth/register", register)
app.post("/employee/registerEmployee", registerEmployee)
app.get("/employee/listEmployee",listEmployee)
app.post("/employee/deleteEmployee",deleteEmployee)
/* ROUTES */
app.use("/auth", authRoutes)



/* MONGOOSE SETUP */
const PORT = 3001;
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

    