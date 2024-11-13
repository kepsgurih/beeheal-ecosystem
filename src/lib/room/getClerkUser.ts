"use server";
import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../parsedStringify";

export interface User {
    id: string;
    name: string;
    avatar: string;
    email: string;
}

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
    try {
        console.log(userIds, 'isian');
        const client = await clerkClient();
        const { data } = await client.users.getUserList({
            userId: userIds,
        });
        console.log(data);
        const users: User[] = data.map((user) => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            avatar: user.imageUrl,
            email: user.emailAddresses[0]?.emailAddress || "",
        }));
        return parseStringify(users);
    } catch (error) {
        console.error("Error getting Clerk users:", error);
        return [];
    }
};