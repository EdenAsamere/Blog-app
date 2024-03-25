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
exports.login = exports.signUpUser = void 0;
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var userModel_1 = require("../models/userModel");
var signUpUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, username, userNameUnique, emailUnique, salt, hashedPassword, newUser, user, savedUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = req.body, email = _a.email, password = _a.password, username = _a.username;
                return [4 /*yield*/, userModel_1.default.findOne({ username: username })];
            case 1:
                userNameUnique = _b.sent();
                if (userNameUnique) {
                    res.status(401).json({ message: 'User name already taken!' });
                }
                return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
            case 2:
                emailUnique = _b.sent();
                if (emailUnique) {
                    res.status(401).json({ message: 'User with this email is already registered!' });
                }
                return [4 /*yield*/, bcrypt.genSalt()];
            case 3:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt.hash(password, salt)];
            case 4:
                hashedPassword = _b.sent();
                newUser = __assign(__assign({}, req.body), { password: hashedPassword });
                user = new userModel_1.default(newUser);
                return [4 /*yield*/, user.save()];
            case 5:
                savedUser = _b.sent();
                res.status(201).json(savedUser);
                return [2 /*return*/];
            case 6:
                error_1 = _b.sent();
                res.status(500).json({ message: 'Failed to create Comment', error: error_1.message });
                return [2 /*return*/];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.signUpUser = signUpUser;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isValidPassword, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.status(401).json({ message: "Authentication Failed" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 2:
                isValidPassword = _b.sent();
                if (!isValidPassword) {
                    res.status(401).json({ message: "Authentication Failed" });
                    return [2 /*return*/];
                }
                token = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_SECRET_KEY);
                // Respond with access token and user ID
                res.status(200).json({
                    accessToken: token,
                    userId: user._id
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error(error_2);
                res.status(500).json({ message: 'Failed to login', error: error_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
