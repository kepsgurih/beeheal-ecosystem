"use server"

import { auth } from "@clerk/nextjs/server";
import axios from "axios";

interface labelsProsp {
    label: string | '';
    show: boolean
}

export const postNewOrgServices = async (data: labelsProsp) => {
    const url = process.env.PUBLIC_URL
    const { getToken } = await auth()
    try {
        await axios({
            url: url + '/api/v1/organization',
            method: 'POST',
            data,
            headers: {
                Authorization: 'Bearer ' + await getToken()
            }
        })
        return {
            data: 'Berhasil',
            error: false
        }
    }
    catch (e) {
        console.error(e, 'src/services/org.ts')
        return {
            error: true,
            data: 'Gagal input data'
        }
    }
}

export const putOrgServices = async (orgId: string, userId: string) => {
    const url = process.env.PUBLIC_URL
    const { getToken } = await auth()
    try {
        await axios({
            url: url + '/api/v1/organization',
            method: 'PUT',
            data: {
                orgId,
                userId
            },
            headers: {
                Authorization: 'Bearer ' + await getToken()
            }
        })
        return {
            data: 'Berhasil',
            error: false
        }
    }
    catch (e) {
        console.error(e, 'src/services/org.ts')
        return {
            error: true,
            data: 'Gagal input data'
        }
    }
}

export const listAllOrgServices = async () => {
    const url = process.env.PUBLIC_URL
    const { getToken } = await auth()

    try {
        const data = await axios({
            url: url + '/api/v1/organization',
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + await getToken()
            }
        })
        return {
            data: data.data,
            error: false
        }
    }
    catch (e) {
        console.error(e, 'src/services/org.ts')
        return {
            error: true,
            data: []
        }
    }
}