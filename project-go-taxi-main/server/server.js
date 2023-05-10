import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import employees from "./routes/employee.js"

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/employee", employees);

// Starts Expresss server 
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
