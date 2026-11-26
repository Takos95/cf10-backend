"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PhoneSchema = new mongoose_1.Schema({
    type: String,
    number: String,
});
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxLength: 20,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password needed"],
    },
    firstname: String,
    lastname: String,
    email: { type: String, required: true, index: true },
    address: {
        area: String,
        street: String,
        number: String,
        po: String,
        municipality: String,
    },
    phone: [PhoneSchema],
    roles: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Role", required: true }],
}, {
    collection: "users",
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=user.model.js.map