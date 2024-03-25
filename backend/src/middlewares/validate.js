"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
var validate = function (schema) {
    return function (req, res, next) {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        }
        catch (e) {
            console.log({ e: e });
            var message = e.errors.map(function (err) { return err.message; });
            return res.status(400).json({ message: message.join(','), sucess: false });
        }
    };
};
exports.validate = validate;
