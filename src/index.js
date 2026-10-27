import express from "express";
import pool from "./db.js";
const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is up and running");
});

(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("DB is connected....");

    app.listen(PORT, () => {
      console.log(`SERVER is up on ${PORT} `);
    });
  } catch (error) {
    console.error("ERROR: ", error);
    process.exitCode = 1;
  }
})();
