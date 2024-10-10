"use server"

import axios, { AxiosError } from 'axios'
import { cookies } from "next/headers";

const sessionPassword = process.env.SESSION_PASSWORD as string;
if (!sessionPassword) throw new Error("SESSION_PASSWORD is not set");

export const registerServices = async ({ name, email, password }: { name: string, email: string, password: string }) => {
    try {
        const resp = await axios({
            url: '/api/v1/auth/register',
            method: 'POST',
            data: {
                name,
                email,
                password
            }
        })

        console.log('RESP01', resp)
        return {
            status: true,
            resp
        }
    }

    catch (error) {
        return {
            status: false,
            error
        }
    }
}

export const loginServices = async (_currentState: unknown, formData: FormData) => {
    console.log('service created[1] ', `${process.env.NEXT_PUBLIC_VERCEL_URL || process.env.PUBLIC_URL}/api/v1/auth/login`)
    try {
        const resp = await axios({
            url: `${process.env.NEXT_PUBLIC_VERCEL_URL || process.env.PUBLIC_URL}/api/v1/auth/login`,
            method: 'POST',
            data: {
                email: formData.get('email'),
                password: formData.get('password')
            }
        })
        const token = resp.data.token;
        cookies().set('auth_token', token, {
            sameSite: 'strict',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });
    }

    catch (error) {
        let responseMessage
        if (error instanceof AxiosError) {
            responseMessage = error?.response?.data.message;
        } else {
            // Handle error yang tidak diketahui jenisnya
            responseMessage = "Terjadi kesalahan pada server"
        }
        return responseMessage
    }
}