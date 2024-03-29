import Jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";

interface RequestWithToken {
  cookies: { jwt?: string };
}

export const requireAuth = (req: RequestWithToken, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  const secretKey = process.env.JWT_SECRET;

  if (!token) {
    console.error('No token')
    return res.redirect('/login');
  }

  Jwt.verify(token, secretKey as string, (err, decodedToken) => {
    if (err) {
      console.log("Error decoding token", err.message);
      return res.redirect('/login');
    }

    if (!decodedToken) {
      console.error('nvalid tokennn')
      throw new Error("Invalid token");
    }

    console.log(decodedToken);
    next();
  })
};