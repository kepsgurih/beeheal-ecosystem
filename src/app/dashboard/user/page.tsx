import UserList from "@/components/user/page/listUser";
import { Card, CardBody, CardHeader, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";

export default function User() {
    return (
        <Tabs>
            <Stack gap={8}>

                <Card>
                    <CardHeader>
                        <Text fontWeight={'bold'}>
                            User Management & Group Management
                        </Text>
                        <Text fontWeight={'light'} fontSize={'small'}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque voluptatibus natus autem! Ad modi vitae a iste tempora repellendus ducimus voluptatum quis ea repellat ipsum consequuntur, harum, exercitationem, cum dicta.
                        </Text>
                    </CardHeader>
                    <CardBody>
                        <TabList>
                            <Tab>
                                User Management
                            </Tab>
                            <Tab>
                                Group Management
                            </Tab>
                        </TabList>
                    </CardBody>
                </Card>
                <Card>
                    <TabPanels>
                        <TabPanel>
                            <CardBody>
                                <UserList />
                            </CardBody>
                        </TabPanel>
                        <TabPanel>
                            <CardBody>
                                test2
                            </CardBody>
                        </TabPanel>
                    </TabPanels>
                </Card>
            </Stack>
        </Tabs>
    )
}
