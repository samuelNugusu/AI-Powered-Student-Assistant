import { createTask, getTasksByUser } from "./models/taskModel.js";

const test = async () => {
  const task = await createTask(1, "Sample Task", "Simple testing task");
  console.log("Created task:", task);

  const tasks = await getTasksByUser(1);
  console.log("User tasks:", tasks);
};

test();
