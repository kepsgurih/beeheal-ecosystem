import connectMongoDB from "@/lib/mongodb";
import bcrypt from 'bcrypt';
import User from "@/models/user";
import Auth from "@/models/auth"; // Import model Auth
import {
    MIN_PASSWORD,
    PASSWORD_LENGTH,
    REQUIRED_FIELD,
    SERVER_ERROR,
    REGISTERED,
    USED_EMAIL,
    AVATAR_GENERATOR
} from "@/config/auth";

export async function POST(request: Request) {
    try {
        const { email, password, name } = await request.json();

        if (!email || !password || !name) {
            return Response.json(
                REQUIRED_FIELD,
                { status: 400 }
            );
        }

        await connectMongoDB();

        const existingUser = await Auth.findOne({ email });

        if (existingUser) {
            return Response.json(
                USED_EMAIL,
                { status: 409 }
            );
        }

        if (password.length < MIN_PASSWORD) {
            return Response.json(
                PASSWORD_LENGTH(MIN_PASSWORD),
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAuth = new Auth({
            email,
            password: hashedPassword
        });
        await newAuth.save();

        const newUser = new User({
            _id: newAuth._id,
            name,
            email,
            avatar: AVATAR_GENERATOR + name
        });
        await newUser.save();


        return Response.json(
            REGISTERED,
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return Response.json(
            SERVER_ERROR,
            { status: 500 }
        );
    }
}
