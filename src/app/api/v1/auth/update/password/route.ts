import { MIN_PASSWORD, PASSWORD_LENGTH, SERVER_ERROR, UNAUTHORIZED } from "@/config/auth";
import connectMongoDB from "@/lib/mongodb";
import Auth from "@/models/auth";
import * as jose from 'jose'
import bcrypt from 'bcrypt';

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

        const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
        const { payload } = await jose.jwtVerify(token, secret);
        const { password, newPassword } = await request.json();
        await connectMongoDB();
        
        if (!password || !newPassword) {
            return Response.json({ message: 'Password atau Password baru wajib diisi' }, { status: 401 });
        } else {
            if (newPassword.length < MIN_PASSWORD) {
                return Response.json(
                    PASSWORD_LENGTH(MIN_PASSWORD),
                    { status: 400 }
                );
            } else {
                const user = await Auth.findById(payload.id)

                if (user && (await bcrypt.compare(password, user.password))) {
                    const hashedPassword = await bcrypt.hash(newPassword, 10);

                    await Auth.findByIdAndUpdate(payload.id, { password: hashedPassword });

                    return Response.json({ message: 'Password berhasil di update' }, { status: 200 });
                } else {
                    return Response.json({ message: 'Periksa kembali password lama Anda' }, { status: 401 });
                }

            }

        }

    } catch (error) {
        console.error('Error patch email:', error);
        return Response.json(SERVER_ERROR, { status: 500 });
    }
}