"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var postController_1 = require("../controllers/postController");
var authMiddleware_1 = require("../middlewares/authMiddleware"); // Import the authentication middleware
var validate_1 = require("../middlewares/validate");
// import { postSchema} from "../utils/validations/postValidation";
var postRouter = (0, express_1.Router)();
postRouter.post('/', authMiddleware_1.authMiddleware, validate_1.validate, postController_1.createDraftforPost);
postRouter.put('/:postid/publish', authMiddleware_1.authMiddleware, postController_1.PublishPost);
postRouter.get('/', postController_1.getAllPosts);
postRouter.get('/:postid', postController_1.getPostById);
postRouter.put('/:postid', authMiddleware_1.authMiddleware, validate_1.validate, postController_1.updatePost);
postRouter.delete('/:postid', authMiddleware_1.authMiddleware, postController_1.deletePost);
postRouter.put('/:postid/savePost', authMiddleware_1.authMiddleware, validate_1.validate, postController_1.savePost);
postRouter.put('/:postid/likePost', authMiddleware_1.authMiddleware, postController_1.likePost);
postRouter.get('/:postid/comments', postController_1.getPostComment);
exports.default = postRouter;
