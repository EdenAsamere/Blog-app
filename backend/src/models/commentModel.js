"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentSchema = void 0;
var mongoose_1 = require("mongoose");
exports.CommentSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: false,
    },
    postId: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.default.model('Comment', exports.CommentSchema);
