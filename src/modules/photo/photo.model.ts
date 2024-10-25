import mongoose, { Document, Schema } from 'mongoose';

export interface IPhoto extends Document {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export const photoSchema = new Schema({
    albumId: {
        type: Number, required: true
    },
    id: {
        type: Number, required: true
    },
    title: {
        type: String, required: true
    },
    url: {
        type: String, required: true
    },
    thumbnailUrl: {
        type: String, required: true
    },
}, { timestamps: true });

photoSchema.index({ id: 1, url: 1 },{ unique: true });

export const Photo = mongoose.model<IPhoto>('Photo', photoSchema);