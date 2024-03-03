import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/userModel";
import Product from "../models/productModel"
import jwt from 'jsonwebtoken';


export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
};

export const getUser = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID." });
  }

  try {
    const user: IUser | null = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, phoneNumber, location, email, password, confirmPassword } = req.body as {
      firstName: string
      lastName: string
      phoneNumber: string
      location: string
      email: string
      password: string
      confirmPassword: string
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use!' })
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match!' });
    }

    const newUser: IUser = await User.create({
      firstName, lastName, phoneNumber, location, email, password: hashedPassword
    });
    res.status(200).json({ message: "User created succefully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string, password: string };
  const secretKey = process.env.JWT_SECRET;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password!' });
    }

    const token = jwt.sign({ id: user.id }, secretKey as string, { expiresIn: '24h' });
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 * 24, secure: true, sameSite: 'none' })
    return res.status(200).json({ message: 'logged in successfully!', token });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const updateUser = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID!" });
  }

  try {
    const updateUser: IUser | null = await User.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ error: "User not found!" })
    }
    res.status(200).json({ message: "User updated successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID!" });
  }

  try {
    const deleteUser: IUser | null = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};