import type { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "services/user.services";
import type { RequestBody } from "types/express";
import type {
  CreateUserInput,
  UpdateUserInput,
} from "validations/user.validation";

const getAllUsersAPI = async (req: Request, res: Response) => {
  const data = await getAllUser();

  res.status(200).json({
    message: "Lấy danh sách người dùng thành công",
    data,
  });
};

const getUserByIdAPI = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await getUserById(+id);

  res.status(200).json({
    message: "Lấy thông tin chi tiết người dùng thành công",
    data: user,
  });
};

const createUserAPI = async (
  req: RequestBody<CreateUserInput>,
  res: Response,
) => {
  const { email, name } = req.body;
  const user = await createUser(email, name);

  res.status(201).json({
    message: "Tạo người dùng thành công",
    data: user,
  });
};

const updateUserAPI = async (
  req: RequestBody<UpdateUserInput>,
  res: Response,
) => {
  const { email, name, id } = req.body;
  const user = await updateUser({ id: +id, email, name });

  res.status(200).json({
    message: "Cập nhật người dùng thành công",
    data: user,
  });
};

const deleteUserAPI = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await deleteUser(+id);

  res.status(200).json({
    message: "Xóa người dùng thành công",
    data: user,
  });
};

export {
  getAllUsersAPI,
  getUserByIdAPI,
  createUserAPI,
  updateUserAPI,
  deleteUserAPI,
};
