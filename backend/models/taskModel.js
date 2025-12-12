import pool from "../config/db.js";

// Create a task
export const createTask = async (userId, title, description) => {
  const result = await pool.query(
    `INSERT INTO tasks (user_id, title, description)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, title, description]
  );
  return result.rows[0];
};

// Get tasks for a user
export const getTasksByUser = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

// Update a task
export const updateTask = async (taskId, title, description) => {
  const result = await pool.query(
    `UPDATE tasks
     SET title = $1, description = $2
     WHERE id = $3
     RETURNING *`,
    [title, description, taskId]
  );
  return result.rows[0];
};

// Delete a task
export const deleteTask = async (taskId) => {
  await pool.query(`DELETE FROM tasks WHERE id = $1`, [taskId]);
  return { message: "Task deleted" };
};
