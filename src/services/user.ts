"use server"

import { auth } from "@clerk/nextjs/server";
import axios from "axios";

export const ListOfUsers = async () => {
    const url = process.env.PUBLIC_URL
    const { getToken } = await auth()

    try {
        const data = await axios({
            url: url + '/api/v1/user',
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + await getToken()
            }
        })
        return {
            data: data.data,
            error: false
        }
    } catch (e) {
        console.error(e, 'src/services/user.ts')
        return {
            error: true,
            data: []
        };
    }
};