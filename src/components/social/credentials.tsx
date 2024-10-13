import { Box, Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

export default function SignInWithCredentials() {
    return (
        <Stack>
            <form>
                <FormControl>
                    <FormLabel>Alamat Email</FormLabel>
                    <Input type='email' />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input type='password' />
                </FormControl>
                <Button mt={3}>
                    Masuk
                </Button>
            </form>
        </Stack>
    )
}