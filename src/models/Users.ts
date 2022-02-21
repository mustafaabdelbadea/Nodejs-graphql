import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
    },
    password: String,
    confirmed: {
      type: Boolean,
      default: false
    }
  },

  {
    minimize: true,
    toJSON: {
      getters: true,
    },
    toObject: {
      getters: true,
    },
  }
);

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmed: boolean;
}

export interface UserDocuemt extends Document, IUser {}

export const UserModel = mongoose.model<UserDocuemt>("User", userSchema);
