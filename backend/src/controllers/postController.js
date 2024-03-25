"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = exports.savePost = exports.getPostComment = exports.deletePost = exports.updatePost = exports.getPostById = exports.getAllPosts = exports.PublishPost = exports.createDraftforPost = void 0;
var postModel_1 = require("../models/postModel");
var commentModel_1 = require("../models/commentModel");
var postModel_2 = require("../models/postModel");
var userModel_1 = require("../models/userModel");
var createDraftforPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postData, newPost, savedPost, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                postData = __assign({ isPublished: false, author: (_a = req.userData) === null || _a === void 0 ? void 0 : _a.userId }, req.body);
                newPost = new postModel_1.default(postData);
                return [4 /*yield*/, newPost.save()];
            case 1:
                savedPost = _b.sent();
                res.status(201).json(savedPost);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                res.status(500).json({ message: 'Failed to create post', error: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createDraftforPost = createDraftforPost;
var PublishPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, postData, post, updatedPost, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                postId = req.params.postid;
                postData = req.body;
                return [4 /*yield*/, postModel_1.default.findById(postId)];
            case 1:
                post = _b.sent();
                if (!post) {
                    res.status(404).json({ message: 'Post not found' });
                    return [2 /*return*/];
                }
                if (((_a = req.userData) === null || _a === void 0 ? void 0 : _a.userId) !== postData.author.toString()) {
                    res.status(401).json({ message: 'This is not your post' });
                }
                return [4 /*yield*/, postModel_2.default.findByIdAndUpdate(postId, { isPublished: true }, { new: true })];
            case 2:
                updatedPost = _b.sent();
                res.status(200).json(updatedPost);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                res.status(500).json({ message: 'Failed to publish post', error: error_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.PublishPost = PublishPost;
var getAllPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var author, cat, page, limit, query, postsCount, totalPages, posts, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                author = req.query.author;
                cat = req.query.category;
                page = parseInt(req.query.page) || 1;
                limit = parseInt(req.query.limit) || 10;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                query = {};
                if (author) {
                    query.author = author;
                }
                else if (cat) {
                    query.category = { $in: [cat] };
                }
                return [4 /*yield*/, postModel_1.default.countDocuments(query)];
            case 2:
                postsCount = _a.sent();
                totalPages = Math.ceil(postsCount / limit);
                return [4 /*yield*/, postModel_1.default.find(query)
                        .sort({ createdAt: -1 })
                        .skip((page - 1) * limit)
                        .limit(limit)];
            case 3:
                posts = _a.sent();
                res.status(200).json({ posts: posts, totalPages: totalPages });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                res.status(500).json({ message: 'Failed to fetch posts', error: error_3.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getAllPosts = getAllPosts;
var getPostById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, post, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                postId = req.params.postid;
                return [4 /*yield*/, postModel_1.default.findById(postId)];
            case 1:
                post = _a.sent();
                if (!post) {
                    res.status(404).json({ message: 'Post not found' });
                    return [2 /*return*/];
                }
                res.status(200).json(post);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(500).json({ message: 'Failed to fetch post', error: error_4.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPostById = getPostById;
var updatePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, postData, post, updatedPost, error_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                postId = req.params.postid;
                postData = req.body;
                return [4 /*yield*/, postModel_1.default.findById(postId)];
            case 1:
                post = _b.sent();
                if (!post) {
                    res.status(404).json({ message: 'Post not found' });
                    return [2 /*return*/];
                }
                console.log(req.userData);
                if (((_a = req.userData) === null || _a === void 0 ? void 0 : _a.userId) !== postData.author.toString()) {
                    res.status(401).json({ message: 'This is not your post' });
                }
                return [4 /*yield*/, postModel_2.default.findByIdAndUpdate(postId, postData, { new: true })];
            case 2:
                updatedPost = _b.sent();
                res.status(200).json(updatedPost);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _b.sent();
                res.status(500).json({ message: 'Failed to update post', error: error_5.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updatePost = updatePost;
// Function to delete a post
var deletePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, postData, post, deletedPost, error_6;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                postId = req.params.postid;
                postData = req.body;
                return [4 /*yield*/, postModel_1.default.findById(postId)];
            case 1:
                post = _b.sent();
                if (!post) {
                    res.status(404).json({ message: 'Post not found' });
                    return [2 /*return*/];
                }
                // console.log(req.userData?.userId)
                if (((_a = req.userData) === null || _a === void 0 ? void 0 : _a.userId) !== postData.author.toString()) {
                    res.status(401).json({ message: 'This is not your post' });
                }
                return [4 /*yield*/, postModel_2.default.findByIdAndDelete(postId)];
            case 2:
                deletedPost = _b.sent();
                res.status(200).json(deletedPost);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _b.sent();
                res.status(500).json({ message: 'Failed to update post', error: error_6.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deletePost = deletePost;
var getPostComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, comment, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                postId = req.params.postid;
                return [4 /*yield*/, commentModel_1.default.findOne({ postId: postId }).sort({ createdAt: -1 })];
            case 1:
                comment = _a.sent();
                res.status(200).json(comment);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                res.status(500).json({ message: 'Failed to get comment', error: error_7.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPostComment = getPostComment;
var savePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, post, user, error_8;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, , 6]);
                postId = req.params.postid;
                return [4 /*yield*/, postModel_1.default.findById(postId)];
            case 1:
                post = _d.sent();
                if (!post) {
                    res.status(404).json({ message: 'Post not found' });
                    return [2 /*return*/];
                }
                if (((_a = req.userData) === null || _a === void 0 ? void 0 : _a.userId) !== post.author.toString()) {
                    res.status(401).json({ message: 'You can not save your own post' });
                }
                return [4 /*yield*/, userModel_1.default.findById((_b = req.userData) === null || _b === void 0 ? void 0 : _b.userId.toString())];
            case 2:
                user = _d.sent();
                if (user === null || user === void 0 ? void 0 : user.savedPosts.includes(postId)) {
                    res.status(400).json({ message: 'Post already on your list' });
                }
                return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.updateOne({ $push: { savedPosts: postId } }))];
            case 3:
                _d.sent();
                return [4 /*yield*/, userModel_1.default.findById((_c = req.userData) === null || _c === void 0 ? void 0 : _c.userId.toString())];
            case 4:
                user = _d.sent();
                res.status(200).json({ data: user });
                return [3 /*break*/, 6];
            case 5:
                error_8 = _d.sent();
                res.status(500).json({ message: 'Failed to save post', error: error_8.message });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.savePost = savePost;
var likePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, post, user, error_9;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, , 6]);
                postId = req.params.postid;
                return [4 /*yield*/, postModel_1.default.findById(postId)];
            case 1:
                post = _d.sent();
                if (!post) {
                    res.status(404).json({ message: 'Post not found' });
                    return [2 /*return*/];
                }
                if (((_a = req.userData) === null || _a === void 0 ? void 0 : _a.userId) !== post.author.toString()) {
                    res.status(401).json({ message: 'You can not like your own post' });
                }
                return [4 /*yield*/, userModel_1.default.findById((_b = req.userData) === null || _b === void 0 ? void 0 : _b.userId.toString())];
            case 2:
                user = _d.sent();
                if (user === null || user === void 0 ? void 0 : user.likedPosts.includes(postId)) {
                    res.status(400).json({ message: 'Post already on your favorites list' });
                }
                return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.updateOne({ $push: { likedPosts: postId } }))];
            case 3:
                _d.sent();
                return [4 /*yield*/, userModel_1.default.findById((_c = req.userData) === null || _c === void 0 ? void 0 : _c.userId.toString())];
            case 4:
                user = _d.sent();
                res.status(200).json({ data: user });
                return [3 /*break*/, 6];
            case 5:
                error_9 = _d.sent();
                res.status(500).json({ message: 'Failed to like post', error: error_9.message });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.likePost = likePost;
