import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  otp?: string;
  otpExpiry?: Date;
  isVerified: boolean;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  otpExpiry: { type: Date },
  isVerified: { type: Boolean, default: false },
});

export default mongoose.model<IUser>("User", userSchema);
