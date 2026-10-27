import dotenv from "dotenv";
import { Pool } from "pg"

dotenv.config()

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on("error", (error) => {
  console.error("ERROR FORM DB: ", error);
});

export default pool
