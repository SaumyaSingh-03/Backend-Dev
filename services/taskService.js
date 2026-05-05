import Task from "../models/task.model.js";

export async function createTask(data, userId) {
  const existingTask = await Task.findOne({
    userId,
    title: data.title
  });

  if (existingTask) {
    throw new Error("Task with same title already exists");
  }

  const task = await Task.create({
    ...data,
    userId,
    status: data.status || "pending"
  });

  return task;
}

export async function updateTask(taskId, data, userId) {
  const task = await Task.findOne({
    _id: taskId,
    userId
  });

  if (!task) return null;

  if (data.title) {
    const duplicate = await Task.findOne({
      userId,
      title: data.title,
      _id: { $ne: taskId }
    });

    if (duplicate) {
      throw new Error("Task with same title already exists");
    }
  }

  Object.assign(task, data);
  await task.save();

  return task;
}

export async function deleteTask(taskId, userId) {
  const task = await Task.findOneAndDelete({
    _id: taskId,
    userId
  });

  return task;
}

export async function getPendingTasks(userId) {
  const tasks = await Task.find({
    userId,
    status: "pending"
  });

  return tasks;
}
