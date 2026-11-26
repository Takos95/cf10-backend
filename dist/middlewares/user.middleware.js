"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAdminRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "";
const hasAdminRole = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        const token = header?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token is missing" });
        }
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const checkAdminRole = payload.roles.some((r) => r.role === "ADMIN" && r.active);
        console.log("checkAdminRole", checkAdminRole);
        if (!checkAdminRole) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }
};
exports.hasAdminRole = hasAdminRole;
//# sourceMappingURL=user.middleware.js.map