import { pool } from "../db.js";

export const dashboardDetails = async (userId) => {
  const [workspaceResult, taskResult] = await Promise.all([
    pool.query(
      `SELECT COUNT(*) AS total
        FROM workspace
        WHERE user_id = $1`,
      [userId],
    ),

    pool.query(
      `SELECT t.completed
        FROM tasks t
        JOIN workspace w ON w.id = t.workspace_id
        WHERE w.user_id = $1`,
      [userId],
    ),
  ]);

  return {
    totalWorkspaces: Number(workspaceResult.rows[0].total),
    tasks: taskResult.rows,
  };
};
