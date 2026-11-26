"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getOneByEmail = exports.getAll = void 0;
const userService = __importStar(require("../services/user.service"));
const getAll = async (req, res, next) => {
    try {
        const result = await userService.findUsers();
        // console.log("Result>>", result);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.getAll = getAll;
const getOneByEmail = async (
//req: Request<{email:string}>,
req, res, next) => {
    try {
        const param = req.params.email;
        if (typeof param != "string") {
            console.log("NO EMAIL");
            throw new Error("Expected one email parameter");
        }
        const email = param;
        const result = await userService.findUserByEmail(email);
        console.log("BYEMAIL RESULT", result);
        if (!result)
            return res.status(404).json({ message: "User not found by email" });
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.getOneByEmail = getOneByEmail;
const create = async (req, res, next) => {
    try {
        const data = req.body;
        console.log(">>>", data);
        const result = await userService.createUser(data);
        if (!result) {
            return res.status(404).json({ message: "User not created" });
        }
        res.status(200).json(result);
    }
    catch (err) {
        return res.status(404).json({ message: "User already exists" });
    }
};
exports.create = create;
const update = async (req, res, next) => {
    try {
        const param = req.params.username;
        if (typeof param != "string") {
            throw new Error("Expected one username parameter");
        }
        const username = param;
        const data = req.body;
        const result = await userService.updateUser(username, data);
        if (!result) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.update = update;
const remove = async (req, res, next) => {
    try {
        const param = req.params.username;
        if (typeof param != "string") {
            throw new Error("Expected one username parameter");
        }
        const username = param;
        const result = await userService.deleteUser(username);
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ deleted: result });
    }
    catch (err) {
        next(err);
    }
};
exports.remove = remove;
//# sourceMappingURL=user.controller.js.map