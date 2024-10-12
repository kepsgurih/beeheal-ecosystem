import { Card, CardBody, CardHeader, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

export default function User() {
    return (
        <Tabs>
            <Stack gap={8}>

                <Card>
                    <CardHeader>
                        User Management
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
                                test
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
