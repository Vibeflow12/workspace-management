import {
  createWorkspace,
  deleteWorkspace,
  getWorkspaceByUser,
} from "../queries/workspace.Queries.js";
import { stringToNumberSchema } from "../validators/strToNum.validator.js";
import { createWorkspaceSchema } from "../validators/workspace.validator.js";

export const creatWrokspacect = async (req, res) => {
  try {
    const parsed = createWorkspaceSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "incorrect format",
        error: parsed.error,
      });
    }

    const result = await createWorkspace(parsed.data.name, req.user.id);

    return res.status(201).json({
      workspaceId: result.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getAllWorkspacect = async (req, res) => {
  try {
    const result = await getWorkspaceByUser(req.user.id);
    return res.json({ workspaces: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteWorkspacect = async (req, res) => {
  try {
    const parsedData = stringToNumberSchema.safeParse(req.params.workspaceId);
    if (!parsedData.success) {
      return res.status(400).json({ message: parsedData.error.flatten() });
    }

    const { workspaceId } = parsedData.parsedData;

    const result = await deleteWorkspace(workspaceId, req.user.id);
    if (result === 0) {
      return res.status(404).json({
        message:"workspace not found"
      })
    }
    return res.json({ message: "Workspace deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
