import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { SERVER_ERROR, UNAUTHORIZED, USER_UPDATED } from "@/config/auth";
import jwt from 'jsonwebtoken';


export async function PUT(request: Request) {
    try {
        const { name, avatar } = await request.json();
        const authHeader = request.headers.get('Authorization');
        if (!authHeader) {
            return Response.json(UNAUTHORIZED, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return Response.json(UNAUTHORIZED, { status: 401 });
        }

        // Verifikasi token
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || '');
        await connectMongoDB();


        await connectMongoDB();

        // Mencari pengguna berdasarkan ID
        const user = await User.findById(decoded.id);
        if (!user) {
            return Response.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        if (name) user.name = name;
        if (avatar) user.avatar = avatar;

        await user.save();

        return Response.json(
            USER_UPDATED(user),
            { status: 200 }
        );
    } catch (error) {
        console.error('Update user error:', error);
        return Response.json(
            SERVER_ERROR,
            { status: 500 }
        );
    }
}