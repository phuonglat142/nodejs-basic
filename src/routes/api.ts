import {
  createUserAPI,
  deleteUserAPI,
  getAllUsersAPI,
  getUserByIdAPI,
  updateUserAPI,
} from "controllers/user.controller";
import express, { Express } from "express";
import { validateBody } from "middlewares/validation.middleware";
import {
  createUserSchema,
  updateUserSchema,
} from "validations/user.validation";

const router = express.Router();

const apiRoutes = (app: Express) => {
  //Get all users
  router.get("/users", getAllUsersAPI);
  //Get user by id
  router.get("/users/:id", getUserByIdAPI);
  //Create user
  router.post("/users", validateBody(createUserSchema), createUserAPI);
  //Update user
  router.put("/users", validateBody(updateUserSchema), updateUserAPI);
  //Delete user
  router.delete("/users/:id", deleteUserAPI);

  app.use("/api", router);
};

export default apiRoutes;
