import mongoose from 'mongoose';

export default interface IUser {
  email: string;
  login: string;
  password: string;
  _id: mongoose.Types.ObjectId;
}