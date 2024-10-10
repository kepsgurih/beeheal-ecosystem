import { SERVER_ERROR, UNAUTHORIZED, USED_EMAIL } from "@/config/auth";
import connectMongoDB from "@/lib/mongodb";
import Auth from "@/models/auth";
import * as jose from 'jose';

export async function PATCH(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader) {
            return Response.json(UNAUTHORIZED, { status: 401 });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return Response.json(UNAUTHORIZED, { status: 401 });
        }
       
        // Verify token
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
        const { payload } = await jose.jwtVerify(token, secret);

        await connectMongoDB();
        const { email } = await request.json();

        
        const existingUser = await Auth.findOne({ email });
        if (existingUser) {
            return Response.json(USED_EMAIL, { status: 409 });
        }

        await Auth.findByIdAndUpdate(payload.id, { email });
        return Response.json({ message: 'Email berhasil di update' }, { status: 200 });
    } catch (error) {
        console.error('Error patch email:', error);
        return Response.json(SERVER_ERROR, { status: 500 });
    }
}