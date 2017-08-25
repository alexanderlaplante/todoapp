import { Model, Schema, model } from 'mongoose';

export const personSchema: Schema = new Schema({
    name: String,
    age: Number,
    isEngineer: Boolean,
}, { timestamps: true });

// 'timestamps' tells mongoose to add 'createdAt: Date' and 'updatedAt: Date' to Person documents

export const Person: Model<any> = model('Person', personSchema);
