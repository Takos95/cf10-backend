import { Document, Types } from "mongoose";
export interface IPhone {
    type: string;
    number: string;
}
export interface IUser extends Document {
    username: string;
    password: string;
    firstname?: string;
    lastname?: string;
    email: string;
    address?: {
        area?: string;
        street?: string;
        number?: string;
        po?: string;
        municipality?: string;
    };
    phone?: IPhone[];
    roles?: Types.ObjectId[];
}
declare const _default: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=user.model.d.ts.map