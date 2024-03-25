"use strict";
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
exports.getLikedPosts = exports.getSavedPosts = exports.updateProfile = exports.getuserById = exports.getUsers = void 0;
var userModel_1 = require("../models/userModel");
var bcrypt = require("bcryptjs");
var postModel_1 = require("../models/postModel");
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, keyword, users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                keyword = req.query.search
                    ? {
                        $or: [{ userName: { $regex: req.query.search, $options: "i" } }],
                        _id: { $ne: userId.toString() },
                    }
                    : {};
                return [4 /*yield*/, userModel_1.default.find(keyword)];
            case 1:
                users = _a.sent();
                res.status(200).json(users);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
var getuserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                return [4 /*yield*/, userModel_1.default.findById(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(404).json({ message: 'user not found' });
                    return [2 /*return*/];
                }
                res.status(200).json(user);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ message: 'Failed to fetch user', error: error_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getuserById = getuserById;
var updateProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userData, salt, hashPass, user, updatedUser, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                userId = req.params.userId;
                userData = req.body;
                // console.log(req.userData?.userId.toString())
                // console.log(userId)
                if (((_a = req.userData) === null || _a === void 0 ? void 0 : _a.userId.toString()) !== userId) {
                    res.status(401).json({ message: 'Unauthorized' });
                    return [2 /*return*/];
                }
                if (!req.body.password) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 1:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt.hash(req.body.password, salt)];
            case 2:
                hashPass = _b.sent();
                req.body.password = hashPass;
                _b.label = 3;
            case 3: return [4 /*yield*/, userModel_1.default.findById(userId)];
            case 4:
                user = _b.sent();
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, userModel_1.default.findByIdAndUpdate(userId, userData, { new: true })];
            case 5:
                updatedUser = _b.sent();
                res.status(200).json(updatedUser);
                return [3 /*break*/, 7];
            case 6:
                error_3 = _b.sent();
                res.status(500).json({ message: 'Failed to update user', error: error_3.message });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.updateProfile = updateProfile;
var getSavedPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, savedPosts, postPromises, resolvedPosts, error_4;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                userId = req.params.userId;
                return [4 /*yield*/, userModel_1.default.findById(userId)];
            case 1:
                user = _c.sent();
                console.log((_a = req.userData) === null || _a === void 0 ? void 0 : _a.userId.toString());
                console.log(userId);
                if (((_b = req.userData) === null || _b === void 0 ? void 0 : _b.userId.toString()) !== userId) {
                    res.status(401).json({ message: 'Unauthorized' });
                    return [2 /*return*/];
                }
                if (!user) {
                    res.status(404).json({ error: 'User not found' });
                    return [2 /*return*/];
                }
                savedPosts = user.savedPosts || [];
                postPromises = savedPosts.map(function (postId) { return postModel_1.default.findById(postId); });
                return [4 /*yield*/, Promise.all(postPromises)];
            case 2:
                resolvedPosts = _c.sent();
                res.status(200).json(resolvedPosts.filter(function (post) { return post !== null; })); // Filter out null values
                return [3 /*break*/, 4];
            case 3:
                error_4 = _c.sent();
                console.error('Error fetching saved posts:', error_4);
                res.status(500).json({ message: 'Failed to fetch saved posts', error: error_4.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getSavedPosts = getSavedPosts;
var getLikedPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, likedPosts, postPromises, resolvedPosts, error_5;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                userId = req.params.userId;
                return [4 /*yield*/, userModel_1.default.findById(userId)];
            case 1:
                user = _c.sent();
                console.log((_a = req.userData) === null || _a === void 0 ? void 0 : _a.userId.toString());
                console.log(userId);
                if (((_b = req.userData) === null || _b === void 0 ? void 0 : _b.userId.toString()) !== userId) {
                    res.status(401).json({ message: 'Unauthorized' });
                    return [2 /*return*/];
                }
                if (!user) {
                    res.status(404).json({ error: 'User not found' });
                    return [2 /*return*/];
                }
                likedPosts = user.likedPosts || [];
                postPromises = likedPosts.map(function (postId) { return postModel_1.default.findById(postId); });
                return [4 /*yield*/, Promise.all(postPromises)];
            case 2:
                resolvedPosts = _c.sent();
                res.status(200).json(resolvedPosts.filter(function (post) { return post !== null; })); // Filter out null values
                return [3 /*break*/, 4];
            case 3:
                error_5 = _c.sent();
                // console.error('Error fetching liked posts:', error);
                res.status(500).json({ message: 'Failed to fetch liked posts', error: error_5.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getLikedPosts = getLikedPosts;
