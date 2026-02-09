// middleware/validationMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validateBody = (schema: z.ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors specifically
        const errorMessages = error.issues.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        return res.status(400).json({
          error: "Invalid data",
          details: errorMessages,
        });
      }
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  };
};
