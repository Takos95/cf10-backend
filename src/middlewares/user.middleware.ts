import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
//import dotenv from "dotenv";
import { IRoleDTO } from "../dto/role.dto";
import { AuthPayloadDTO } from "../dto/auth.dto";
//dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

export const hasAdminRole = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const header = req.headers.authorization;
    const token = header?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }
    const payload = jwt.verify(token, JWT_SECRET) as AuthPayloadDTO;
    const checkAdminRole = payload.roles.some(
      (r: IRoleDTO) => r.role === "ADMIN" && r.active,
    );
    console.log("checkAdminRole", checkAdminRole);
    if (!checkAdminRole) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
