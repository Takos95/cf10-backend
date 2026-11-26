"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoleSchema = new mongoose_1.Schema({
    role: { type: String, required: true, unique: true },
    description: String,
    active: Boolean,
}, {
    collection: "roles",
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Role", RoleSchema);
//# sourceMappingURL=role.model.js.map