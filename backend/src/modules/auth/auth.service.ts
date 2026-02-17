import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../utils/prisma";

const JWT_SECRET = process.env.JWT_SECRET as string;


export const registerUser = async (email: string, password: string) => {

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
    },
  });

  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt
  };
};



export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { userId: user.id },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { token };
};
