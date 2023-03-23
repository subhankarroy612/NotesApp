import { model, Schema } from 'mongoose';

const userSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

}, {
    versionKey: false,
    timestamps: true
})

export const userModel = model('user', userSchema)