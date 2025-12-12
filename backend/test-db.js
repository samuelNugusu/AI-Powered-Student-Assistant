import dotenv from "dotenv";
import pg from "pg";

dotenv.config();
const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function testDB() {
  try {
    await client.connect();
    console.log("Database connection successful.");
  } catch (err) {
    console.error("Database connection failed:", err.message);
  } finally {
    await client.end();
  }
}

testDB();
