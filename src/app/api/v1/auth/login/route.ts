import { INVALID, SERVER_ERROR } from "@/config/auth";
import connectMongoDB from "@/lib/mongodb";
import Auth from "@/models/auth";
import bcrypt from 'bcrypt';
import * as jose from 'jose';

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const { email, password } = await request.json();
    const user = await Auth.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
      const alg = 'HS256';

      const token = await new jose.SignJWT({ id: user._id.toString() })
        .setProtectedHeader({ alg })
        .setExpirationTime('7d')
        .sign(secret);

      return Response.json({ token }, { status: 200 });
    } else {
      return Response.json(INVALID, { status: 401 });
    }
  } catch (error) {
    console.error('LOGIN error:', error);
    return Response.json(SERVER_ERROR, { status: 500 });
  }
}