'use client';

import React, { FormEvent, useState } from "react";
import { loginServices, registerServices } from "@/services/auth";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Text,
    Box,
    VStack
} from "@chakra-ui/react";
import { useFormState, useFormStatus } from "react-dom";

export default function SignInForm() {
    const [errorMessage, dispatch] = useFormState(loginServices, undefined)

    const [type, setType] = useState('login')

    return (
        <form action={dispatch}>
            <VStack gap={'8'}>
                {errorMessage &&
                    <Box bgColor={'#E78F81'} minW={'100%'} borderRadius={10}>
                        <Text textColor={'#FFF5CD'} textAlign={'center'} p={1}>
                            {errorMessage}
                        </Text>
                    </Box>
                }
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" type='email' placeholder="contoh@email.com" />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input name="password" type='password' placeholder="******" />
                </FormControl>
                <LoginButton />
                <Button colorScheme="blue" w={'100%'} variant={'ghost'}>{type === 'register' ? 'Sudah punya akun ?' : 'Belum punya akun ? daftar disini'}</Button>
            </VStack>
        </form>
    )
}


function LoginButton() {
    const { pending } = useFormStatus()

    const handleClick = (event: FormEvent) => {
        if (pending) {
            event.preventDefault()
        }
    }

    return (
        <Button disabled={pending} isLoading={pending} type="submit" onClick={handleClick}>
            Login
        </Button>
    )
}