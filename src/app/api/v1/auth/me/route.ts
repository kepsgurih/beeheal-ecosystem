import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import * as jose from 'jose';
import { SERVER_ERROR, UNAUTHORIZED } from "@/config/auth";
import Auth from "@/models/auth";

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader) {
            return Response.json(UNAUTHORIZED, { status: 401 });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return Response.json(UNAUTHORIZED, { status: 401 });
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
        const { payload } = await jose.jwtVerify(token, secret);

        await connectMongoDB();
        const user = await User.findById(payload.id);
        const user01 = await Auth.findById(payload.id).select('-password');
        
        if (!user || !user01) {
            return Response.json(UNAUTHORIZED, { status: 401 });
        }

        const data = {
            ...user._doc,
            email: user01.email
        };

        return Response.json(data, { status: 200 });
    } catch (error) {
        console.error('Error fetching user info:', error);
        return Response.json(SERVER_ERROR, { status: 500 });
    }
}