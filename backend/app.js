"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var connectDB_1 = require("./src/config/connectDB");
var postRoute_1 = require("./src/routes/postRoute");
var commentRoute_1 = require("./src/routes/commentRoute");
var userRoute_1 = require("./src/routes/userRoute");
var authRoute_1 = require("./src/routes/authRoute");
var errorHandler_1 = require("./src/middlewares/errorHandler");
var authMiddleware_1 = require("./src/middlewares/authMiddleware");
var categoryRoute_1 = require("./src/routes/categoryRoute");
// Connect to the database
(0, connectDB_1.default)();
var app = express();
// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
// Routes
app.use('/api/posts', postRoute_1.default);
app.use('/api/auth/', authRoute_1.default);
app.use('/api/comment/', commentRoute_1.default);
app.use('/api/category/', categoryRoute_1.default);
app.use('/:api/user', authMiddleware_1.authMiddleware, userRoute_1.default);
app.use(errorHandler_1.default);
exports.default = app;
