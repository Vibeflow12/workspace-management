import { Router } from "express";
import {
  creatWrokspacect,
  getAllWorkspacect,
  deleteWorkspacect,
} from "../controller/workspaceController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const workspaceRouter = Router();

workspaceRouter.use(authMiddleware);
workspaceRouter.post("/", creatWrokspacect);
workspaceRouter.get("/workspaces", getAllWorkspacect);
workspaceRouter.delete("/:workspaceId", deleteWorkspacect);
