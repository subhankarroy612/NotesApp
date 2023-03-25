import { model, Schema } from 'mongoose';

const sectionSchema = new Schema({

    sectionName: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }

}, {
    versionKey: false,
    timestamps: true
})

export const sectionModel = model('section', sectionSchema)