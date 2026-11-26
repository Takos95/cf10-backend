"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGoogleIDToken = verifyGoogleIDToken;
const google_auth_library_1 = require("google-auth-library");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const client = new google_auth_library_1.OAuth2Client(GOOGLE_CLIENT_ID);
async function verifyGoogleIDToken(idToken) {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log("PAYLOAD>>", payload);
    if (!payload) {
        throw new Error("No payload found in Google ID token");
    }
    return payload;
}
//# sourceMappingURL=googleVerify.js.map