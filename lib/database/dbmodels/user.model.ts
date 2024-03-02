import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  planId: string;
  customerType: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  planId: { type: String, required: true },
  customerType: { type: Number, required: true, default: 1 }, // Enum ???
  username: { type: String, unique: true, required: true },
  firstName: { type: String },
  lastName: { type: String },
});

const User = models?.User || model("User", UserSchema);
export default User;
