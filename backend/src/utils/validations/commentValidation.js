"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommentSchema = void 0;
var zod_1 = require("zod");
exports.CreateCommentSchema = (0, zod_1.object)({
    userId: (0, zod_1.string)(),
    comment: (0, zod_1.string)().min(2).max(255),
    postId: (0, zod_1.string)()
});
