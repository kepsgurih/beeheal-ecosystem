import { AppstoreOutlined, MenuOutlined } from "@ant-design/icons";
import { Box, Flex, Button, IconButton } from "@chakra-ui/react";

export default function Page() {


    return (
        <div className="">
            <Box bgColor={"red"} width={"-moz-fit-content"}borderRadius='lg' outlineColor={"black"}>
                <Flex >
                    <IconButton icon={<AppstoreOutlined/>} aria-label='Call Sage'>
                        <div className="font-bold text[#606C80] text-[12px]">Board View</div>
                    </IconButton>
                    <IconButton icon={<MenuOutlined />} aria-label='Call Sage'>
                        List View
                    </IconButton>
                </Flex>
            </Box>
        </div>
    )
}