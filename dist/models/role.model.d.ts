import { Document, Types } from "mongoose";
export interface IRole extends Document {
    _id: Types.ObjectId;
    role: string;
    description: string;
    active: boolean;
}
declare const _default: import("mongoose").Model<IRole, {}, {}, {}, Document<unknown, {}, IRole, {}, import("mongoose").DefaultSchemaOptions> & IRole & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IRole & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=role.model.d.ts.map