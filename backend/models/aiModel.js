import pool from "../config/db.js";

// Save each AI query
export const saveAIQuery = async (userId, prompt, response) => {
  const result = await pool.query(
    `INSERT INTO ai_queries (user_id, prompt, response)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, prompt, response]
  );
  return result.rows[0];
};

// Get all AI queries for one user
export const getUserAIQueries = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM ai_queries
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};
