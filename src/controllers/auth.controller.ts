import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    if (!result) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    res.json({ token: result.token, user: { username: result.user.username } });
  } catch (err) {
    next(err);
  }
};

export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.body;
    const result = await authService.googleLogin(token);
    if (!result) {
      return res.status(400).json({ status: false, message: "Google login failed" });
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
