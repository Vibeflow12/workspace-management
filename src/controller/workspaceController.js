import {
  createWorkspace,
  deleteWorkspace,
  getWorkspaceByUser,
} from "../queries/workspace.Queries.js";
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
    const  workspaceId  = Number(req.params.workspaceId);
    if (!Number.isInteger(workspaceId) || workspaceId <= 0) {
      return res.status(400).json({ message: "invalid workspace id" });
    }

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

//create workspace req name res {worspaceid:1}
//get all workspace return all the workspace belongs to user res{workspace:[]}
// delete workspace user can delete there own workspace,deleteing workspace must delete all the task belongigng
