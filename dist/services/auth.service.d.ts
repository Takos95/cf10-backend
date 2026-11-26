import { IRoleDTO } from "../dto/role.dto";
export declare const login: (username: string, password: string) => Promise<{
    user: import("mongoose").PopulateDocumentResult<import("mongoose").Document<unknown, {}, import("../models/user.model").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/user.model").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }, {
        roles: IRoleDTO[];
    }, Omit<import("../models/user.model").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "roles"> & {
        roles: IRoleDTO[];
    }, import("../models/user.model").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    token: string;
} | null>;
export declare const googleLogin: (idToken: string) => Promise<{
    status: boolean;
    token: string;
    message?: never;
} | {
    status: boolean;
    message: unknown;
    token?: never;
}>;
//# sourceMappingURL=auth.service.d.ts.map