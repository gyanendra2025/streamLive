import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("backend is running...");
});

app.listen(5001, () => {
  console.log(`Server is running on port ${PORT}`);
});
