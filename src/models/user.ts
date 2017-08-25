import { Model, Schema, model } from 'mongoose';

export const userSchema: Schema = new Schema({
    firstName: String,
    lastName: String,
    fullName: String,
    emailAddress: String,
    password: String,
    active: Boolean
}, { timestamps: true });

// 'timestamps' tells mongoose to add 'createdAt: Date' and 'updatedAt: Date' to Person documents
export const User: Model<any> = model('User', userSchema);
