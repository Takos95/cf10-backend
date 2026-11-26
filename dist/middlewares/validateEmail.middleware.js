"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = void 0;
const validateEmail = (paramName = "email") => (req, res, next) => {
    const value = req.params[paramName];
    if (typeof value !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    next();
};
exports.validateEmail = validateEmail;
//# sourceMappingURL=validateEmail.middleware.js.map