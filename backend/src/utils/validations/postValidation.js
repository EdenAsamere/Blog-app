"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
var zod_1 = require("zod");
exports.postSchema = (0, zod_1.object)({
    title: (0, zod_1.string)({ required_error: "title is required" }).min(2).max(255),
    detail: (0, zod_1.string)().min(2),
    isPublished: (0, zod_1.boolean)().optional(),
    author: (0, zod_1.string)(),
    post_picture: (0, zod_1.string)().optional(),
    min_to_read: (0, zod_1.number)().int().positive(),
    comment: (0, zod_1.array)((0, zod_1.string)()).optional(),
    category: (0, zod_1.array)((0, zod_1.string)()).optional(),
});
