import dotenv from "dotenv";
import { createUser, findUserByUsername } from "../queries/auth.Queries.js";
import { signinSchema, signupSchema } from "../validators/user.validator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

export const signup = async (req, res) => {
  try {
    const parsedData = signupSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "invalid data",
        error: parsedData.error,
      });
    }

    const { username, password } = parsedData.data;

    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({
        message: "user already exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await createUser(username, hashPassword);

    return res.status(200).json({
      message: "user created successfully",
    });
  } catch (error) {
    console.error("ERROR: ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const signin = async (req, res) => {
  try {
    const parsedData = signinSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "invalid data",
        error: parsedData.error,
      });
    }

    const { username, password } = parsedData.data;

    const existingUser = await findUserByUsername(username);
    if (!existingUser) {
      return res.status(409).json({
        message: "go back and signup",
      });
    }

    const compairPassword = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (compairPassword) {
      const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SCERET, {
        expiresIn: "2h",
      });

      return res.json({
        token: token,
      });
    } else {
      return res.status(403).json({
        message: "invalid credentials",
      });
    }
  } catch (error) {
    console.error("ERROR: ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
