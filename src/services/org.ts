"use server"

import connectMongoDB, { connectDB } from "@/lib/mongodb";
import Organization from "@/models/organization";
import { auth } from "../auth"
import { IOrganization } from "@/types/types";
import User from "@/models/user";

interface dataProps {
    label: string;
    show: boolean;
}

export const postNewOrgServices = async (data: dataProps) => {
    const session = await auth()
    const dataBaru = { ...data, owner: session?.user.id, users: [session?.user.id] }

    try {
        await connectDB();
        const newData = new Organization(dataBaru)
        await newData.save()
        return true

    } catch (e) {
        console.log(e)
        return false
    }
}


export const listAllOrgServices = async () => {
    try {
        await connectMongoDB();

        const organizations = await Organization.find();

        const organization = organizations.map(org => ({
            _id: org._id.toString(),
            owner: org.owner,
            users: org.users,
            label: org.label,
            show: org.show
        }));
        return {
            data: organization as IOrganization[],
            error: false
        }
    }
    catch (e) {
        console.error('Error fetching users /src/services/org.ts', e);
        return {
            error: true,
            data: []
        }
    }
}

export const UpdateUserOrgs = async (userId: string, orgId: string) => {
    try {
        await connectMongoDB();

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const organization = await Organization.findById(orgId);
        if (!organization) {
            throw new Error('Organization not found');
        }

        user.orgsId = orgId;
        await user.save();

        if (!organization.users.includes(userId)) {
            organization.users.push(userId);
            await organization.save();
        }

        return true;
    } catch (error) {
        console.error('Error updating user organizations:', error);
        throw error;
    }
}