import { IUser } from '@/types/types';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    avatar: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    verified: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;