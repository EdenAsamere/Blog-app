"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategorySchema = void 0;
var zod_1 = require("zod");
exports.createCategorySchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: "category name is required" }).min(2, { message: 'user name should be minimum of 2 characters' })
    })
});
