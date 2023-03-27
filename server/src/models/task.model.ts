import { model, Schema } from 'mongoose';

const taskSchema = new Schema({

    taskName: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    sectionId: {
        type: Schema.Types.ObjectId,
        ref: 'section'
    }

}, {
    versionKey: false,
    timestamps: true
})

export const taskModel = model('task', taskSchema)