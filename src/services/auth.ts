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
    try {
        const resp = await axios({
            url: `${process.env.PUBLIC_URL as string}api/v1/auth/login`,
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

// export const getMeServices = async (fromAPI?: boolean, tokenstring?: string) => {
//     try {
//         let token
//         if (fromAPI) {
//             token = tokenstring;
//         } else {
//             token = localStorage.getItem('token');
//         }
//         const resp = await axios.get('/api/v1/auth/me', {
//             headers: { Authorization: `Bearer ${token}` }
//         });
//         const encryptedSession = await sealData(JSON.stringify(resp.data), {
//             password: sessionPassword,
//         });

//         cookies().set('auth_session', encryptedSession, {
//             sameSite: 'strict',
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//         });
//         return {
//             status: true,
//             response: resp.data
//         };
//     } catch (error: any) {
//         return {
//             status: false,
//             error: error.message
//         };
//     }
// };