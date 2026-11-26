"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import express from "express";
const db_1 = require("./utils/db");
const app_1 = __importDefault(require("./app"));
//const app = express();
const start = async () => {
    await (0, db_1.connectDB)();
    app_1.default.listen(3001, () => {
        console.log("Server is running");
    });
};
start();
//# sourceMappingURL=server.js.map