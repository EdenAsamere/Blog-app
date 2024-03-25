"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../constants");
var zod_1 = require("zod");
var errorHandler = function (err, req, res, next) {
    var statusCode = res.statusCode || 500;
    if (err instanceof zod_1.ZodError) {
        // Handle Zod validation errors
        var validationErrors = err.errors.map(function (error) { return ({
            path: error.path.join('.'),
            message: error.message,
        }); });
        res.status(400).json({
            title: 'Validation Error',
            message: 'One or more validation errors occurred',
            errors: validationErrors,
        });
    }
    else {
        switch (statusCode) {
            case constants_1.constants.UNAUTHORIZED:
                res.json({ title: "Unauthorized access", message: err.message, stackTrace: err.stack });
                break;
            case constants_1.constants.FORBIDDEN:
                res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
                break;
            case constants_1.constants.SERVER_ERROR:
                res.json({ title: "Server Error", message: err.message, stackTrace: err.stack });
                break;
            default:
                console.error(err.stack); // Log the error stack for other types of errors
                res.status(statusCode).json({ title: "Error", message: err.message });
                break;
        }
    }
    next(); // Call next middleware
};
exports.default = errorHandler;
