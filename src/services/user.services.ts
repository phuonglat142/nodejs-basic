import { prisma } from "libs/prisma";
import type { CreateUserInput, UpdateUserInput } from "src/validations/user.validation";
import AppError from "utils/error";

const isEmailExist = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email,
        },
    });
};

const getAllUser = async () => {
    return await prisma.user.findMany();
};

const getUserById = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) {
        throw new AppError("Người dùng không tồn tại", 404);
    }

    return user;
};

const createUser = async (data: CreateUserInput) => {
    const isExist = await isEmailExist(data.email);

    if (isExist) {
        throw new AppError("Email đã tồn tại", 409);
    }

    return prisma.user.create({
        data: {
            ...data,
        },
    });
};

const updateUser = async (data: UpdateUserInput, id: number) => {
    const existing = await getUserById(id);

    if (data.email && data.email !== existing.email) {
        const emailTaken = await isEmailExist(data.email);
        if (emailTaken) throw new AppError("Email đã tồn tại", 409);
    }

    return prisma.user.update({
        where: { id },
        data: {
            ...data,
        },
    });
};

const deleteUser = async (id: number) => {
    await getUserById(id);
    return await prisma.user.delete({
        where: { id },
    });
};

export { getAllUser, getUserById, createUser, updateUser, deleteUser };
