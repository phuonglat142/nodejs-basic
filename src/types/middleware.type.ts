import type { Request, Response, NextFunction } from "express";
import type { z } from "zod";

export type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

export type ValidateInput = (schema: z.ZodType) => MiddlewareFunction;
