import express from "express";
import { connectDB } from "./db.js";
import { authRouter } from "./routes/authRoutes.js";
const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is up and running");
});

app.use("/api/v1/auth", authRouter);

(async () => {
  try {
    await connectDB()
    console.log("DB is connected....");

    app.listen(PORT, () => {
      console.log(`SERVER is up on ${PORT} `);
    });
  } catch (error) {
    console.error("ERROR: ", error);
    process.exitCode = 1;
  }
})();
