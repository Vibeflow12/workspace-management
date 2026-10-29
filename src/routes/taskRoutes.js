import { Router } from "express";
import {
  createTaskct,
  deleteTaskct,
  getTaskct,
  updateTaskct,
} from "../controller/taskController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const taskRouter = Router();

taskRouter.use(authMiddleware);

taskRouter.post("/:workspaceId", createTaskct);
taskRouter.get("/:workspaceId", getTaskct);
taskRouter.put("/:taskId", updateTaskct);
taskRouter.delete("/:workspaceId/:taskId", deleteTaskct);
