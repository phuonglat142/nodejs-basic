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
    //Get all users
    router.get("/users", asyncHandler(getAllUsersAPI));
    //Get user by id
    router.get("/users/:id", asyncHandler(getUserByIdAPI));
    //Create user
    router.post("/users", validateBody(createUserSchema), asyncHandler(createUserAPI));
    //Update user
    router.put("/users/:id", validateBody(updateUserSchema), asyncHandler(updateUserAPI));
    //Delete user
    router.delete("/users/:id", asyncHandler(deleteUserAPI));

    app.use("/api", router);
};

export default apiRoutes;
