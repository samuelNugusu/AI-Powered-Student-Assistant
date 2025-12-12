// backend/controllers/taskController.js
import Joi from "joi";
import { createTaskDb, getTasksByUser, updateTaskDb, deleteTaskDb } from "../models/taskModel.js";

const taskSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().allow("").optional(),
  due_date: Joi.date().allow(null).optional(),
  priority: Joi.number().integer().min(1).max(5).optional(),
});

export const createTask = async (req, res) => {
  try {
    const { error, value } = taskSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const task = await createTaskDb({
      userId: req.user.id,
      title: value.title,
      description: value.description,
      due_date: value.due_date,
      priority: value.priority ?? 3,
    });

    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create task" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await getTasksByUser(req.user.id);
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get tasks" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const result = await updateTaskDb(req.params.id, req.user.id, req.body);
    if (!result) return res.status(404).json({ message: "Task not found" });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update task" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await deleteTaskDb(req.params.id, req.user.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete task" });
  }
};
