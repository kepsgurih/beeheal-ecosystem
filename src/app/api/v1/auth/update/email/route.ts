import { SERVER_ERROR, UNAUTHORIZED, USED_EMAIL } from "@/config/auth";
import connectMongoDB from "@/lib/mongodb";
import Auth from "@/models/auth";
import jwt from 'jsonwebtoken';

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

        // Verifikasi token
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || '');
        await connectMongoDB();

        const { email } = await request.json();

        // Cek apakah email baru sudah digunakan
        const existingUser = await Auth.findOne({ email });
        if (existingUser) {
            return Response.json(USED_EMAIL, { status: 409 });
        }

        // Perbarui email pengguna
        await Auth.findByIdAndUpdate(decoded.id, { email });

        return Response.json({ message: 'Email berhasil di update' }, { status: 200 });

    } catch (error) {
        console.error('Error patch email:', error);
        return Response.json(SERVER_ERROR, { status: 500 });
    }
}