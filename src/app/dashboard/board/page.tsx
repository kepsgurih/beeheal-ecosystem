import { AppstoreOutlined, MenuOutlined, LockFilled, SearchOutlined, AlignCenterOutlined, AlignLeftOutlined, FileDoneOutlined, AppstoreAddOutlined, DashOutlined } from "@ant-design/icons";
import { Button, ButtonGroup, Select, Box, Show, Input, InputGroup, InputLeftElement, IconButton, Card, CardHeader, CardBody, Grid } from "@chakra-ui/react";

export default function Page() {
    return (

        <div>
            <div className="flex width-max">
                <ButtonGroup
                    bg='white'
                    height='40px'
                    width='249'
                    borderRadius='lg'
                    boxShadow='sm'>
                    <Button
                        leftIcon={<AppstoreOutlined />}
                        variant='none'
                        color='#606C80'>Board View
                    </Button>
                    <div className="h-[40px] w-[1px] bg-[#EDEDED]" />
                    <Button
                        leftIcon={<MenuOutlined />}
                        variant='none'
                        color='#606C80'>List View
                    </Button>
                </ButtonGroup>
                <>
                    <Show above='sm'>
                        <div className="h-[40px] w-[1px] bg-[#E7E7E7] mx-[16px]" />
                        <div className="flex">
                            <LockFilled style={{ color: '#98A2B2' }} />
                            <Select
                                placeholder='Limited Access'
                                color='#98A2B2'
                                border='none'
                                fontSize='11px'
                                fontWeight='bold'>
                                Limited Access
                            </Select>
                        </div>
                        <div className="h-[40px] w-[1px] bg-[#E7E7E7] mx-[16px]" />
                        <Box
                            marginX='16px'
                            display='flex'
                            textAlign='center'
                            alignItems='center'
                            alignContent='center'
                            fontSize='11px'>
                            <div className="font-bold text-[#98A2B2]">
                                Owners
                            </div>
                            <div className="h-[24px] w-[24px] font-bold mx-[24px] text-[#606C80] bg-white shadow-sm rounded-full ">X</div>
                            <div className="font-bold text-[#606C80] text-size[11px]">
                                X Team
                            </div>
                            <div className="h-[40px] w-[1px] bg-[#E7E7E7] mx-[16px]" />
                            <InputGroup
                                width='176px'
                                color='#98A2B2'
                            >
                                <InputLeftElement pointerEvents='none'>
                                    <SearchOutlined color='gray.300' />
                                </InputLeftElement>
                                <Input type='text' pl='44px' fontWeight='semibold' placeholder='Search Task' fontSize='12px' />
                            </InputGroup>
                            <IconButton
                                aria-label=""
                                icon={<FileDoneOutlined />}
                                rounded='lg'
                                color='#C7CED9'
                                shadow='sm'
                                w='40px'
                                h='40px'
                                mx='3px'
                                bg='white' />
                            <IconButton
                                aria-label=""
                                icon={<AlignCenterOutlined />}
                                rounded='lg'
                                color='#C7CED9'
                                shadow='sm'
                                w='40px'
                                h='40px'
                                mx='3px'
                                bg='white' />
                            <IconButton
                                aria-label=""
                                icon={<AlignLeftOutlined />}
                                rounded='lg'
                                color='#C7CED9'
                                shadow='sm'
                                w='40px'
                                h='40px'
                                mx='3px'
                                bg='white' />
                            <IconButton
                                aria-label=""
                                icon={<DashOutlined />}
                                rounded='lg'
                                color='#C7CED9'
                                shadow='sm'
                                w='40px'
                                h='40px'
                                mx='3px'
                                bg='white' />
                            <IconButton
                                aria-label=""
                                icon={<AppstoreAddOutlined />}
                                rounded='lg'
                                color='#C7CED9'
                                shadow='sm'
                                w='40px'
                                h='40px'
                                mx='3px'
                                bg='white' />
                        </Box>
                    </Show>
                </>
            </div>
            <div>
                <div>
                    <div className="flex mt-[20px] justify-between">
                        <div className="font-bold text-[16px] flex">
                            Your Task
                            <div className="ml-[12px] w-[24px] h-[24px] rounded-full content-center text-center bg-[#EAB308]/10 text-[#CA8A04] font-bold text-[10px]">
                                5
                            </div>
                        </div>
                        <IconButton
                            aria-label=""
                            icon={<DashOutlined />}
                            variant='none'
                            width='24px'
                            height='24px' />
                    </div>
                    <Grid>
                        <Card
                            width='251px'
                            height='188px'
                            mr='38px'>
                            <CardHeader
                                fontSize='12px'
                                fontWeight='bold'>
                                Page “Order” and “Setting
                                <FileDoneOutlined />
                            </CardHeader>
                            <CardBody />
                        </Card>
                    </Grid>

                </div>
            </div>

        </div>
    )
}