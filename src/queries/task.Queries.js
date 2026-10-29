import { pool } from "../db.js";

export const createTask = async (workspaceId, userID, title, description, due_date) => {
  const result = await pool.query(
    `INSERT INTO tasks(title,description,workspace_id,due_date)
    SELECT $3:: text, $4:: text, id
    FROM workspace
    WHERE id=$1 AND user_id = $2
    RETURNING id,title, description, completed, workspace_id, due_date`,
    [workspaceId, userID, title, description, due_date],
  );
  return result.rows[0] || null;
};

export const getTask = async (workspaceId, userID, limit, offset,search) => {
  const result = await pool.query(
    `SELECT t.title, t.description, t.completed, t.workspace_id, t.due_date
    FROM tasks t
    JOIN workspace w on w.id = t.workspace_id
    WHERE t.workspace_id=$1 AND w.user_id=$2 AND t.title ILIKE $5
    ORDER BY t.id ASC LIMIT $3 OFFSET $4
    `,
    [workspaceId, userID, limit, offset,`%${search}%`],
  );
  return result.rows;
};

export const updateTask = async (taskId, userID, completed) => {
  const result = await pool.query(
    `UPDATE tasks
    SET completed =$3
    WHERE id=$1 AND workspace_id IN (SELECT id FROM workspace WHERE user_id=$2)
    RETURNING id, title, description, completed, workspace_id`,
    [taskId, userID, completed],
  );
  return result.rows[0] || null;
};

export const deleteTask = async (workspaceId, taskId, userID) => {
  const result = await pool.query(
    `DELETE FROM tasks
    where workspace_id=$1 AND id=$2
    AND workspace_id IN (SELECT id FROM workspace WHERE user_id = $3)`,
    [workspaceId, taskId,userID],
  );
  return result.rowCount;
};
