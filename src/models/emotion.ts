import { IEmotion } from '@/types/types';
import { Schema, model, models } from 'mongoose';

const EmotionSchema = new Schema<IEmotion>({
    userId: { type: String, required: true },
    avatar: { type: String, required: true },
    fullName: { type: String, required: true },
    emotionType: { type: Number, required: true, min: 1, max: 5 },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
});

EmotionSchema.pre('save', function (next) {
    this.updatedDate = new Date();
    next();
});

const Emotion = models.Emotion || model<IEmotion>('Emotion', EmotionSchema);
export default Emotion;
