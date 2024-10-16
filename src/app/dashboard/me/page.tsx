import React from "react";
import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Stack,
    StackDivider,
} from "@chakra-ui/react";

export default function Page() {
    return (
        <Stack divider={<StackDivider />} spacing={'6'}>
            <Card>
                <CardHeader>
                    <Heading size='md'>Edit Profile</Heading>
                </CardHeader>
                <CardBody>
                    <Stack spacing='5'>
                        <Box>
                            <FormControl>
                                <FormLabel>First Name</FormLabel>
                                <Input placeholder="Enter First Name" />
                                <FormHelperText>
                                    First Name will be displayed in the application
                                </FormHelperText>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormLabel>Last Name</FormLabel>
                                <Input placeholder="Enter Last Name" />
                                <FormHelperText>
                                    Last Name will be displayed in the application
                                </FormHelperText>
                            </FormControl>
                        </Box>
                    </Stack>
                </CardBody>
                <CardFooter>
                    <Button width={'100%'} colorScheme="blue">
                        Save
                    </Button>
                </CardFooter>

            </Card>
        </Stack>
    )
}