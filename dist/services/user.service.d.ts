import { CreateUserDTO, UpdateUserDTO } from "../dto/user.dto";
import { IUser } from "../models/user.model";
export declare const SALT_ROUNDS: number;
export declare const findUsers: () => Promise<import("../dto/user.dto").UserResponseDTO[]>;
export declare const findUserByEmail: (email: string) => Promise<import("../dto/user.dto").UserResponseDTO | undefined>;
export declare const createUser: (payload: Partial<CreateUserDTO>) => Promise<IUser | undefined>;
export declare const updateUser: (username: string, payload: UpdateUserDTO) => Promise<IUser | null>;
export declare const deleteUser: (username: string) => Promise<boolean>;
//# sourceMappingURL=user.service.d.ts.map