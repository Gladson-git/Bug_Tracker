import mysql from "mysql2/promise";
import dotenv from "dotenv";

// IMPORTANT: point to root .env
dotenv.config({ path: "../.env" });

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,   // ensure correct variable name
  database: process.env.DB_NAME
});

console.log("Database connected successfully ✅");

export default db;
