"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.signUpUserSchema = void 0;
var zod_1 = require("zod");
exports.signUpUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({ required_error: "email is required" })
            .email({ message: 'Invalid email address' }),
        username: (0, zod_1.string)({ required_error: "username is required" })
            .min(3, { message: 'user name should be minimum of 3 characters' })
            .max(10, { message: 'username should be minimum of 10 characters' }),
        password: (0, zod_1.string)({ required_error: "password is required" })
            .min(8, { message: 'Password should have at least 8 characters' }),
    })
});
exports.loginUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({ required_error: "email is required" }).email({ message: 'Invalid email address' }),
        password: (0, zod_1.string)({ required_error: "password is required" }),
    })
});
