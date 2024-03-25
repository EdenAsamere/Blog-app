"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var validate_1 = require("../middlewares/validate");
var userValidation_1 = require("../utils/validations/userValidation");
var userRouter = (0, express_1.Router)();
userRouter.get('/:userId', userController_1.getuserById);
userRouter.get('/', userController_1.getUsers);
userRouter.put('/:userId', (0, validate_1.validate)(userValidation_1.updateProfileValidate), userController_1.updateProfile);
userRouter.get('/:userId/savedPosts', userController_1.getSavedPosts);
userRouter.get('/:userId/likedPosts', userController_1.getLikedPosts);
exports.default = userRouter;