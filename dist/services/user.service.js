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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.findUserByEmail = exports.findUsers = exports.SALT_ROUNDS = void 0;
//import User, { IUser } from "../models/user.model";
//προσθήκη για ρόλο schema
const role_model_1 = __importDefault(require("../models/role.model"));
const userDao = __importStar(require("../dao/user.dao"));
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "5");
//export const findUsers = async (): Promise<IUser[]> => {
//console.log(mongoose.modelNames());
const findUsers = async () => {
    //προσθήκη στο populate για ρόλο
    // const users = await User.find()
    //   .populate({ path: "roles", model: Role })
    //   .lean()
    //   .exec();
    const users = await userDao.findAll();
    console.log(">>>>>>>", users);
    return users;
};
exports.findUsers = findUsers;
const findUserByEmail = async (email) => {
    const user = await userDao.findByEmail(email);
    if (user) {
        return user;
    }
};
exports.findUserByEmail = findUserByEmail;
const createUser = async (payload) => {
    if (payload.password) {
        const hash = await bcrypt_1.default.hash(payload.password, exports.SALT_ROUNDS);
        payload.password = hash;
    }
    let roleIds = [];
    if (payload.roles && payload.roles.length > 0) {
        roleIds = payload.roles.map((id) => new mongoose_1.Types.ObjectId(id));
    }
    else {
        let reader = await role_model_1.default.findOne({ role: "READER" });
        if (!reader) {
            reader = await role_model_1.default.create({
                role: "READER",
                description: "Default Role",
                active: true,
            });
        }
        roleIds = [reader._id];
    }
    const user = await userDao.createUser({
        ...payload,
        roles: roleIds,
    });
    if (user) {
        return user;
    }
};
exports.createUser = createUser;
const updateUser = async (username, payload) => {
    const updateData = {};
    if (payload.firstname !== undefined)
        updateData.firstname = payload.firstname;
    if (payload.lastname !== undefined)
        updateData.lastname = payload.lastname;
    if (payload.email !== undefined)
        updateData.email = payload.email;
    if (payload.address !== undefined)
        updateData.address = payload.address;
    if (payload.phone !== undefined)
        updateData.phone = payload.phone;
    if (payload.password) {
        updateData.password = await bcrypt_1.default.hash(payload.password, exports.SALT_ROUNDS);
    }
    if (payload.roles) {
        updateData.roles = payload.roles.map((id) => new mongoose_1.Types.ObjectId(id));
    }
    const user = await userDao.updateUser(username, updateData);
    return user;
};
exports.updateUser = updateUser;
const deleteUser = async (username) => {
    const user = await userDao.deleteUser(username);
    return user;
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.service.js.map