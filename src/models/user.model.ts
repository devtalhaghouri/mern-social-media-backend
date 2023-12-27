import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  refreshToken: string;
  avatar: {
    url: string;
    _id: number;
  };
  watchHistory: Schema.Types.ObjectId;
  isCorrectPassword(enteredPassword: string): Promise<boolean>;
  generateAccestoken(): string;
  generateRefreshtoken(): string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      trim: true,
    },
    watchHistory: {
      type: Schema.Types.ObjectId,
      ref: "History",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isCorrectPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAccestoken = function () {
  return jwt.sign(
    { _id: this._id, name: this.name, email: this.email },
    "sasjdasdla"
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, "sasjdasdla");
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
