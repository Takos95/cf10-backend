export interface GoogleUserPayload {
    sub: string;
    email: string;
    email_verified: boolean;
    name: string;
    picture: string;
}
export declare function verifyGoogleIDToken(idToken: string): Promise<GoogleUserPayload | null>;
//# sourceMappingURL=googleVerify.d.ts.map