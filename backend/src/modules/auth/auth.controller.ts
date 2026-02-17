import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    await registerUser(email, password);

    res.status(201).json({ message: "User created successfully" });

  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const token = await loginUser(email, password);

    res.json(token);

  } catch (e: any) {
    res.status(401).json({ error: e.message });
  }
};
