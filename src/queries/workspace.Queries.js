import { pool } from "../db.js";

export const createWorkspace = async (name, userId) => {
  const result = await pool.query(
    "INSERT INTO workspace(name,user_id) values($1,$2) RETURNING id",
    [name, userId],
  );
  return result.rows[0] || null;
};

export const getWorkspaceByUser = async (userId) => {
  const result = await pool.query(
    "SELECT id,name FROM workspace where user_id=$1 ORDER BY id",
    [userId],
  );
  return result.rows;
};

export const deleteWorkspace = async (workspcaeId, userId) => {
  const result = await pool.query(
    "DELETE FROM workspace where id=$1 AND user_id=$2 ",
    [workspcaeId,userId],
  );
  return result.rowCount;
};
