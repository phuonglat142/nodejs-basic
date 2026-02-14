import type { Express } from "express";
import swaggerUi from "swagger-ui-express";
import "dotenv/config";

const swaggerSpec = {
    openapi: "3.0.0",
    info: {
        title: "Node.js Basic API",
        version: "1.0.0",
        description: "API documentation cho dự án Node.js Basic",
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT || 8080}`,
            description: "Local server",
        },
    ],
    tags: [{ name: "Users", description: "Quản lý người dùng" }],
    components: {
        schemas: {
            User: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    email: { type: "string", example: "user@example.com" },
                    name: { type: "string", example: "Nguyen Van A" },
                    genderId: { type: "integer", example: 1 },
                    phoneNumber: { type: "string", example: "09123456789" },
                    address: { type: "string", example: "Ha Noi, Viet Nam" },
                    dateOfBirth: {
                        type: "string",
                        format: "date-time",
                        example: "2000-01-01T00:00:00.000Z",
                    },
                    description: { type: "string", nullable: true, example: "Mo ta ve nguoi dung" },
                },
            },
            CreateUserInput: {
                type: "object",
                required: ["email", "name", "genderId", "phoneNumber", "address", "dateOfBirth"],
                properties: {
                    email: { type: "string", format: "email", example: "user@example.com" },
                    name: { type: "string", minLength: 2, maxLength: 100, example: "Nguyen Van A" },
                    genderId: { type: "integer", minimum: 1, example: 1 },
                    phoneNumber: { type: "string", minLength: 11, example: "09123456789" },
                    address: {
                        type: "string",
                        minLength: 2,
                        maxLength: 200,
                        example: "Ha Noi, Viet Nam",
                    },
                    dateOfBirth: {
                        type: "string",
                        format: "date-time",
                        example: "2000-01-01T00:00:00.000Z",
                    },
                    description: {
                        type: "string",
                        minLength: 2,
                        maxLength: 500,
                        example: "Mo ta ve nguoi dung",
                    },
                },
            },
            UpdateUserInput: {
                type: "object",
                properties: {
                    email: { type: "string", format: "email", example: "user@example.com" },
                    name: { type: "string", minLength: 2, maxLength: 100, example: "Nguyen Van A" },
                    genderId: { type: "integer", minimum: 1, example: 1 },
                    phoneNumber: { type: "string", minLength: 11, example: "09123456789" },
                    address: {
                        type: "string",
                        minLength: 2,
                        maxLength: 200,
                        example: "Ha Noi, Viet Nam",
                    },
                    dateOfBirth: {
                        type: "string",
                        format: "date-time",
                        example: "2000-01-01T00:00:00.000Z",
                    },
                    description: {
                        type: "string",
                        minLength: 2,
                        maxLength: 500,
                        example: "Mo ta ve nguoi dung",
                    },
                },
            },
        },
    },
    paths: {
        "/api/users": {
            get: {
                summary: "Lấy danh sách người dùng",
                tags: ["Users"],
                responses: {
                    200: {
                        description: "Lấy danh sách người dùng thành công",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                            example: "Lấy danh sách người dùng thành công",
                                        },
                                        data: {
                                            type: "array",
                                            items: { $ref: "#/components/schemas/User" },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                summary: "Tạo người dùng mới",
                tags: ["Users"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/CreateUserInput" },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Tạo người dùng thành công",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                            example: "Tạo người dùng thành công",
                                        },
                                        data: { $ref: "#/components/schemas/User" },
                                    },
                                },
                            },
                        },
                    },
                    400: { description: "Dữ liệu không hợp lệ" },
                    409: { description: "Email đã tồn tại" },
                },
            },
        },
        "/api/users/{id}": {
            get: {
                summary: "Lấy thông tin người dùng theo ID",
                tags: ["Users"],
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: { type: "integer" },
                        description: "ID của người dùng",
                    },
                ],
                responses: {
                    200: {
                        description: "Lấy thông tin chi tiết người dùng thành công",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                            example: "Lấy thông tin chi tiết người dùng thành công",
                                        },
                                        data: { $ref: "#/components/schemas/User" },
                                    },
                                },
                            },
                        },
                    },
                    404: { description: "Không tìm thấy người dùng" },
                },
            },
            put: {
                summary: "Cập nhật thông tin người dùng",
                tags: ["Users"],
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: { type: "integer" },
                        description: "ID của người dùng",
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/UpdateUserInput" },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Cập nhật người dùng thành công",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                            example: "Cập nhật người dùng thành công",
                                        },
                                        data: { $ref: "#/components/schemas/User" },
                                    },
                                },
                            },
                        },
                    },
                    400: { description: "Dữ liệu không hợp lệ" },
                    404: { description: "Không tìm thấy người dùng" },
                    409: { description: "Email đã tồn tại" },
                },
            },
            delete: {
                summary: "Xóa người dùng",
                tags: ["Users"],
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: { type: "integer" },
                        description: "ID của người dùng",
                    },
                ],
                responses: {
                    200: {
                        description: "Xóa người dùng thành công",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                            example: "Xóa người dùng thành công",
                                        },
                                        data: { $ref: "#/components/schemas/User" },
                                    },
                                },
                            },
                        },
                    },
                    404: { description: "Không tìm thấy người dùng" },
                },
            },
        },
    },
};

export const setupSwagger = (app: Express) => {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
