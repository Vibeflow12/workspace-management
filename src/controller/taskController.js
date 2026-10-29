import {
  createTask,
  deleteTask,
  getTask,
  updateTask,
} from "../queries/task.Queries.js";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../validators/task.validator.js";
import { stringToNumberSchema } from "../validators/strToNum.validator.js";

export const createTaskct = async (req, res) => {
  try {
    const parsedData = stringToNumberSchema.safeParse(req.params.workspaceId);

    if (!parsedData.success) {
      return res.status(400).json({ message: parsedData.error.flatten() });
    }

    const workspaceId = parsedData.data;

    const parsed = createTaskSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Incorrect Format",
        error: parsed.error.flatten(),
      });
    }

    const { title, description } = parsed.data;

    const result = await createTask(
      workspaceId,
      req.user.id,
      title,
      description,
    );
    if (!result) {
      return res.status(400).json({
        message: "workspace not found",
      });
    }

    return res.status(201).json({
      message: "task created succefully",
      task: result,
    });
  } catch (error) {
    console.error("ERROR: ", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const getTaskct = async (req, res) => {
  try {
    const parsedData = stringToNumberSchema.safeParse(req.params.workspaceId);

    if (!parsedData.success) {
      return res.status(400).json({ message: parsedData.error.flatten() });
    }

    const workspaceId = parsedData.data;

    const result = await getTask(workspaceId, req.user.id);
    return res.json({ tasks: result });
  } catch (error) {
    console.error("ERROR: ", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const updateTaskct = async (req, res) => {
  try {
    const parsedData = stringToNumberSchema.safeParse(req.params.taskId);

    if (!parsedData.success) {
      return res.status(400).json({ message: parsedData.error.flatten() });
    }

    const taskId = parsedData.data;

    const parsed = updateTaskSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Incorrect Format",
        error: parsed.error.flatten(),
      });
    }

    const { completed } = parsed.data;

    const result = await updateTask(taskId, req.user.id, completed);

    if (result == 0) {
      return res.status(400).json({ message: "task not found" });
    }

    return res.status(200).json({
      message: "task updated",
    });
  } catch (error) {
    console.error("ERROR: ", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const deleteTaskct = async (req, res) => {
  try {
    const parsedDataTaskId = stringToNumberSchema.safeParse(req.params.taskId);
    const parsedDataWorkspaceId = stringToNumberSchema.safeParse(
      req.params.workspaceId,
    );

    if (!parsedDataTaskId.success) {
      return res.status(400).json({
        message: parsedDataTaskId.error.flatten(),
      });
    }

    if (!parsedDataWorkspaceId.success) {
      return res.status(400).json({
        message: parsedDataWorkspaceId.error.flatten(),
      });
    }

    const taskId = parsedDataTaskId.data;
    const workspaceId = parsedDataWorkspaceId.data;

    const result = await deleteTask(workspaceId, taskId, req.user.id);

    if (result === 0) {
      return res.status(400).json({
        message: "task not found",
      });
    }

    return res.status(200).json({
      message: "task deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
