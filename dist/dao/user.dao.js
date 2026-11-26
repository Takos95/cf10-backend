"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLastInsertedUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.findByEmail = exports.findAll = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const role_model_1 = __importDefault(require("../models/role.model"));
const findAll = async () => {
    return await user_model_1.default.find({}, { password: 0 })
        .populate({ path: "roles", model: role_model_1.default })
        .lean()
        .exec();
};
exports.findAll = findAll;
const findByEmail = async (email) => {
    const user = await user_model_1.default.findOne({ email: email }, { password: 0 })
        .populate({ path: "roles", model: role_model_1.default })
        .lean()
        .exec();
    return user;
};
exports.findByEmail = findByEmail;
const createUser = async (data) => {
    const user = await new user_model_1.default(data).save();
    return user;
};
exports.createUser = createUser;
const updateUser = async (username, payload) => {
    return await user_model_1.default.findOneAndUpdate({ username: username }, payload)
        .populate({ path: "roles", model: role_model_1.default })
        .lean()
        .exec();
};
exports.updateUser = updateUser;
const deleteUser = async (username) => {
    const result = await user_model_1.default.findOneAndDelete({ username }).exec();
    return !!result;
};
exports.deleteUser = deleteUser;
// ενα ερωτηματικο ειναι true τα δυο ειναι false. αν η result ειναι null τοτε θα επιστρεψει false !!, αν ειναι καποιο αντικειμενο θα επιστρεψει true !.
const findLastInsertedUser = async () => {
    try {
        const result = await user_model_1.default.find({}).sort({ _id: -1 }).limit(1);
        console.log("Last inserted user: ", result[0]?.username);
        return result[0];
    }
    catch (err) {
        console.log("Problem in finding last inserted user");
    }
};
exports.findLastInsertedUser = findLastInsertedUser;
//# sourceMappingURL=user.dao.js.map