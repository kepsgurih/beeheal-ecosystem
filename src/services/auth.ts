"use server"

import axios from 'axios'
import { cookies } from "next/headers";

const sessionPassword = process.env.SESSION_PASSWORD as string;
if (!sessionPassword) throw new Error("SESSION_PASSWORD is not set");

export const registerServices = async ({ name, email, password }: { name: String, email: String, password: String }) => {
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
            url: 'http://localhost:3000/api/v1/auth/login',
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

    catch (error: any) {
        let responseMessage
        if (error && error.response) {
            responseMessage = error.response.data.message
        } else {
            responseMessage = error.message
        }
        return responseMessage
    }
}

// export const getMeServices = async (fromAPI?: boolean, tokenString?: string) => {
//     try {
//         let token
//         if (fromAPI) {
//             token = tokenString;
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