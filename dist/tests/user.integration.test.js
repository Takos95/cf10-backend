"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testSetup_1 = require("./testSetup");
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const user_dao_1 = require("../dao/user.dao");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "";
const server = new testSetup_1.TestServer();
server.app.use("/users", user_routes_1.default);
describe("User API Tests", () => {
    let token;
    beforeAll(async () => {
        await server.start();
        // const hash = await bcrypt.hash("admin1234", 10);
        // const user = await User.create({
        //   username: "tommyadmin",
        //   password: hash,
        //   email: "admindog@aueb.gr",
        //   roles: [],
        // });
        // token = jwt.sign(
        //   {
        //     username: "admin",
        //     email: "admin@aueb.gr",
        //     roles: [
        //       {
        //         "role":"ADMIN",
        //         "description":"Administrator user",
        //         "actrive": true
        //       }
        //     ]
        //   },
        //   JWT_SECRET,
        //   { expiresIn: "1h" },
        // );
    });
    afterAll(async () => {
        await server.stop();
    });
    test("Get /users -> returns a list of users", async () => {
        const res = await server.request.get("/users");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }, 10000);
    test("Get /users -> Return a status code in wrong endpoint", async () => {
        const res = await server.request.get("/user");
        expect(res.status).toBe(404);
    });
    test("Get /users/email/:email -> Return a user by email", async () => {
        const lastUser = await (0, user_dao_1.findLastInsertedUser)();
        const res = await server.request.get("/users/email/" + lastUser?.email);
        expect(res.status).toBe(200);
        expect(res.body.username).toBe(lastUser?.username);
    });
    test("Get /users/email/:email -> Return a user with wrong email", async () => {
        const res = await server.request.get("/users/email/tomtom@aueb.gr");
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("User not found by email");
    });
});
describe("User API POST request", () => {
    let token;
    beforeAll(async () => {
        await server.start();
        token = jsonwebtoken_1.default.sign({
            username: "admin",
            email: "admin@aueb.gr",
            roles: [
                {
                    role: "ADMIN",
                    description: "Administrator user",
                    active: true,
                },
            ],
        }, JWT_SECRET, { expiresIn: "1h" });
    });
    afterAll(async () => {
        await server.stop();
    });
    test("POST /users -> Create new user", async () => {
        const res = await server.request
            .post("/users")
            .set("Authorization", `Bearer ${token}`)
            .send({
            username: "jestuser",
            password: "123456",
            email: "jestuser@aueb.gr",
        });
        expect(res.status).toBe(200);
        expect(res.body.username).toBe("jestuser");
    });
    test("POST /users -> Create user that exists", async () => {
        const res = await server.request
            .post("/users")
            .set("Authorization", `Bearer ${token}`)
            .send({
            username: "jestuser",
            password: "123456",
            email: "jestuser@aueb.gr",
        });
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("User already exists");
    });
    test("POST /users -> Create user with username<6 an password<6", async () => {
        const res = await server.request
            .post("/users")
            .set("Authorization", `Bearer ${token}`)
            .send({
            username: "jest",
            password: "1234",
            email: "jestuser@aueb.gr",
        });
        expect(res.status).toBe(400);
    });
    test("POST /users -> Create user without JWT or Expired JWT", async () => {
        const res = await server.request.post("/users").send({
            username: "jest",
            password: "1234",
            email: "jestuser@aueb.gr",
        });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Authorization header is missing");
    });
});
describe("User API delete request", () => {
    let token;
    beforeAll(async () => {
        await server.start();
        token = jsonwebtoken_1.default.sign({
            username: "admin",
            email: "admin@aueb.gr",
            roles: [
                {
                    role: "ADMIN",
                    description: "Administrator user",
                    active: true,
                },
            ],
        }, JWT_SECRET, { expiresIn: "1h" });
    });
    afterAll(async () => {
        await server.stop();
    });
    test("DELETE /users delete a user", async () => {
        const res = await server.request
            .delete("/users/jestuser")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
});
//# sourceMappingURL=user.integration.test.js.map