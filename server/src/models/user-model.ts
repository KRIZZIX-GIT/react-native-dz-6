import { Schema, model, Types, Document } from 'mongoose'

export interface IUserDocument extends Document {
    _id: Types.ObjectId
    email: string
    login: string
    password: string
}
const UserSchema = new Schema<IUserDocument>({
    email: { type: String, required: true },
    login: { type: String, required: true },
    password: { type: String, required: true },
})
const UserModel = model('User', UserSchema)

export default UserModel