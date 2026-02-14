import {
    createUserAPI,
    deleteUserAPI,
    getAllUsersAPI,
    getUserByIdAPI,
    updateUserAPI,
} from "controllers/user.controller";
import express, { type Express } from "express";
import { validateBody } from "middlewares/validation.middleware";
import asyncHandler from "utils/catchAsync";
import { createUserSchema, updateUserSchema } from "validations/user.validation";

const router = express.Router();

const apiRoutes = (app: Express) => {
    router.get("/users", asyncHandler(getAllUsersAPI));
    router.get("/users/:id", asyncHandler(getUserByIdAPI));
    router.post("/users", validateBody(createUserSchema), asyncHandler(createUserAPI));
    router.put("/users/:id", validateBody(updateUserSchema), asyncHandler(updateUserAPI));
    router.delete("/users/:id", asyncHandler(deleteUserAPI));

    app.use("/api", router);
};

export default apiRoutes;
