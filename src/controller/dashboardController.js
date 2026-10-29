import { dashboardDetails } from "../queries/dashboard.Queries.js";

export const dashboardct = async (req, res) => {
  try {
    const result = await dashboardDetails(req.user.id);

    const completedTasks = result.tasks.filter(
      (task) => task.completed === true,
    ).length;

    const pendingTasks = result.tasks.filter(
      (task) => task.completed === false,
    ).length;

    return res.status(200).json({
      totalWorkspaces: result.totalWorkspaces,
      totalTasks: result.tasks.length,
      completedTasks,
      pendingTasks,
    });
  } catch (error) {
    console.error("ERROR: ", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
