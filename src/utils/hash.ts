import bcrypt from "bcryptjs";

const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

const comparePassword = async (hashPassword: string, password: string) => {
    return await bcrypt.compare(password, hashPassword);
};

export { hashPassword, comparePassword };
