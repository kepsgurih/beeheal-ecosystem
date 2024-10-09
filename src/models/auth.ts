import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
});

const Auth = mongoose.models.Auth || mongoose.model('Auth', authSchema);
export default Auth;