import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
// import User from "../models/User";
import User from "../models/User";
export const registerUser = async (req: Request, res: Response) => {
  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email }
    });
    if (existingUser) {
      res.status(400).json({ mesaage: "User is Already registerd" });
    } else {
      const { password, ...rest } = req.body;
      const saltRound = 10;
      const hashPassword = await bcrypt.hash(password, saltRound);

      const user = await User.create({
        ...rest,
        password: hashPassword
      });
      res.status(201).json(user);
    }

  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
  console.log("Register request Call");
};

// export const getUsers = async (_req: Request, res: Response) => {
//   const users = await User.findAll();
//   res.json(users);
// };
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email: email }
    });
    if (!user) {
      return res.status(404).json({ message: "Ivalid Credintial" });
    }
    // console.log(user);
    // if(user?.password)
    const matchedPassword = await bcrypt.compare(password,
      user.password);
    if (!matchedPassword) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // remove password before sending response
    const { password: _, ...safeUser } = user.toJSON();

    return res.status(200).json({
      message: "Login successful",
      user: safeUser
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}
