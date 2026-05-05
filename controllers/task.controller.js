import * as taskService from "../services/taskService.js";

export async function createTask(req, res, next) {
  try {
    const { title, description, status, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required!" });
    }

    const task = await taskService.createTask(
      { title, description, status, dueDate },
      req.user._id
    );

    res.status(201).json({
      message: "Task created successfully",
      task
    });

  } catch (error) {
    next(error);
  }
}

export async function updateTask(req, res, next) {
  try {
    const { title, description, status, dueDate } = req.body;

    const task = await taskService.updateTask(
      req.params.id,
      { title, description, status, dueDate },
      req.user._id
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      message: "Task updated successfully",
      task
    });

  } catch (error) {
    next(error);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const task = await taskService.deleteTask(req.params.id, req.user._id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });

  } catch (error) {
    next(error);
  }
}
