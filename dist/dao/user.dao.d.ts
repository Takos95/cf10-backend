import { IUser } from "../models/user.model";
import { UserResponseDTO } from "../dto/user.dto";
export declare const findAll: () => Promise<UserResponseDTO[]>;
export declare const findByEmail: (email: string) => Promise<UserResponseDTO | null>;
export declare const createUser: (data: Partial<IUser>) => Promise<IUser>;
export declare const updateUser: (username: string, payload: Partial<IUser>) => Promise<IUser | null>;
export declare const deleteUser: (username: string) => Promise<boolean>;
export declare const findLastInsertedUser: () => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | undefined>;
//# sourceMappingURL=user.dao.d.ts.map