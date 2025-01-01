import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db.js";
import router from "./routes/main.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("server is up and running");
});

app.use("/api", router);

await db();

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

export default app;
