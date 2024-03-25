"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var commentModel_1 = require("./commentModel");
var PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
    },
    detail: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    post_picture: {
        type: String,
    },
    min_to_read: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    category: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' }],
    comment: [commentModel_1.CommentSchema],
}, { timestamps: true });
exports.default = mongoose_1.default.model('Post', PostSchema);
