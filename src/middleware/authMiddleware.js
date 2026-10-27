import jwt from "jsonwebtoken";
import { findUserBYId } from "../queries/auth.Queries";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }

  try {
    const verifyUser = jwt.verify(token, process.env.JWT_SCERET);
    const user = await findUserBYId(verifyUser.id);
    if (!user) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    return res.status(500).json({
      message: "internal server error",
    });
  };
