"use server"

import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { IUser } from '@/types/types';

export const ListOfUsers = async (): Promise<{ data: IUser[], error: boolean }> => {
    try {
        await connectMongoDB();

        const users = await User.find();

        const plainUsers = users.map(user => ({
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
            emailVerified: user.emailVerified
        }));
        return {
            data: plainUsers as IUser[],
            error: false
        }
    }
    catch (e) {
        console.error('Error fetching users /src/services/user.ts', e);
        return {
            error: true,
            data: []
        }
    }
}