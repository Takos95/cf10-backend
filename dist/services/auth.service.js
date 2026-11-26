"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = exports.login = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const role_model_1 = __importDefault(require("../models/role.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const googleVerify_1 = require("../utils/googleVerify");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRES = "1h";
const login = async (username, password) => {
    const user = await user_model_1.default.findOne({ username }).populate({ path: "roles", model: role_model_1.default });
    if (!user) {
        return null;
    }
    const match = await bcrypt_1.default.compare(password, user.password);
    if (!match) {
        return null;
    }
    const payload = {
        username: user.username,
        email: user.email,
        roles: user.roles,
    };
    const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    return { user, token };
};
exports.login = login;
const googleLogin = async (idToken) => {
    try {
        if (!idToken) {
            return { status: false, message: "Missing Google token" };
        }
        const googleUser = await (0, googleVerify_1.verifyGoogleIDToken)(idToken);
        if (!googleUser) {
            return { status: false, message: "Google user not found" };
        }
        if (!googleUser.email_verified) {
            return { status: false, message: "Google email not verified" };
        }
        if (!googleUser?.email) {
            return { status: false, message: "Google email not found" };
        }
        let user = await user_model_1.default.findOne({ email: googleUser.email });
        if (!user) {
            console.log("User not exist", googleUser.email);
        }
        const token = jsonwebtoken_1.default.sign({
            username: googleUser.sub,
            email: googleUser.email,
            name: googleUser.name,
            photo: googleUser.picture,
            roles: [{}],
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
        //console.log("GOOGLE USER>>", googleUser);
        return {
            status: true,
            token: token,
        };
    }
    catch (err) {
        return { status: false, message: err };
    }
};
exports.googleLogin = googleLogin;
//# sourceMappingURL=auth.service.js.map