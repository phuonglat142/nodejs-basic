import { prisma } from "libs/prisma";

const getAllUser = async () => {
    return await prisma.user.findMany();
};

const getUserById = async (id: number) => {
    return await prisma.user.findUnique({
        where: { id },
    });
};

const createUser = (email: string, name: string) => {
    return prisma.user.create({
        data: {
            email,
            name,
        },
    });
};

const updateUser = ({ email, name, id }: { email?: string; name?: string; id: number }) => {
    return prisma.user.update({
        where: { id },
        data: {
            email,
            name,
        },
    });
};

const deleteUser = async (id: number) => {
    return await prisma.user.delete({
        where: { id },
    });
};

export { getAllUser, getUserById, createUser, updateUser, deleteUser };
