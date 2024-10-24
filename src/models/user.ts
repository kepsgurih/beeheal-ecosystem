import { IUser } from '@/types/types';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    image: {
        type: String,
        required: [true, 'Avatar is required']
    },
    orgsId: {
        type: String,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;