import pool from "../config/db.js";
import bcrypt from "bcrypt";

// CREATE USER
export async function createUser(name, email, password) {
  const password_hash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, created_at`,
    [name, email, password_hash]
  );

  return result.rows[0];
}

// FIND USER BY EMAIL
export async function getUserByEmail(email) {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  return result.rows[0];
}
