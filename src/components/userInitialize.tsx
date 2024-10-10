'use client';

import { setUserData, setUserError } from '@/redux/slices/authSlice';
import { IUserState } from '@/types/types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface UserDataInitializerProps {
    userData: IUserState | null;
    error: string | null;
}

export default function UserDataInitializer({ userData, error }: UserDataInitializerProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (userData) {
            console.log('userData', userData)
            dispatch(setUserData(userData));
        } else if (error) {
            dispatch(setUserError(error));
        }
    }, [userData, error, dispatch]);

    return null;
}