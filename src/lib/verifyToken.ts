import jwt, { JwtPayload } from "jsonwebtoken";

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return decoded as JwtPayload;
    } catch (error: any) {
        console.log(error);
        return null;
    }
}