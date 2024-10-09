'use client';

import { setUserData, setUserError } from '@/redux/slices/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface UserDataInitializerProps {
    userData: any;
    error: string | null;
}

export default function UserDataInitializer({ userData, error }: UserDataInitializerProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (userData) {
            console.log(JSON.parse(userData.value))
            dispatch(setUserData(JSON.parse(userData.value)));
        } else if (error) {
            dispatch(setUserError(error));
        }
    }, [userData, error, dispatch]);

    return null;
}