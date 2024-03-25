"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var commentController_1 = require("../controllers/commentController");
var validate_1 = require("../middlewares/validate");
var commentValidation_1 = require("../utils/validations/commentValidation");
var commentRoute = (0, express_1.Router)();
commentRoute.post('/', (0, validate_1.validate)(commentValidation_1.CreateCommentSchema), commentController_1.createComment);
exports.default = commentRoute;
// 
