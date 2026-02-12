// middleware/validationMiddleware.ts
import type { MiddlewareFunction, ValidateInput } from "types/middleware.type";

export const validateBody: ValidateInput =
  (schema): MiddlewareFunction =>
  (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      return res.status(400).json({
        status: "error",
        message: "Lỗi khi xác thực dữ liệu",
        errors: result.error.issues.map((err) => ({
          path: err.path.join("."),
          message: err.message,
          code: err.code,
        })),
      });
    }
    next();
  };
