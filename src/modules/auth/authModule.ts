import {Schema , Document} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
// * Mongoose defult timestamps
const timestamps = {
  timestamps: true,
};
interface IUser extends Document{
    username: string;
    password: string;
    role?: string;
  }
const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role :{ type: String}
},timestamps);

userSchema.plugin(mongoosePaginate);
export const UserSchema = userSchema;
export { IUser };

