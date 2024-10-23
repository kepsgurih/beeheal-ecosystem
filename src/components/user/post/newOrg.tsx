"use client"

import { postNewOrgServices } from "@/services/org"
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"

export default function PostNewOrgs() {

    const [data, setData] = useState({
        label: '',
        show: true,

    })

    const formAction = async (e: FormEvent) => {
        e.preventDefault()
        const save = await postNewOrgServices(data)
        if (save) {
            toast.info('Berhasil')
            setData({ label: '', show: true })
        } else {
            toast.error('Gagal menyimpan data')
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    return (
        <form onSubmit={formAction}>
            <div>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Label</span>
                    </div>
                    <input value={data.label} name="label" onChange={handleChange} type="text" placeholder="Label tim" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="label cursor-pointer mt-5">
                    <span className="label-text">Tampilkan ?</span>
                    <input type="checkbox" className="toggle" defaultChecked={data.show} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, show: e.target.checked })} />
                </label>
            </div>
            <button type="submit" className="btn btn-block btn-primary mt-10" disabled={data.label === ''}>
                Send
            </button>
        </form>
    )

}