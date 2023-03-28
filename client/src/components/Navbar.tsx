import {
    Box,
    Flex,
    HStack,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
} from '@chakra-ui/react';
import { CgProfile } from 'react-icons/cg'
import { useContext, useEffect, useState } from 'react';
import AuthContext from '@/contextAPI/AuthContext';
import { useRouter } from 'next/router';
import * as jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";

type userType = {
    _id?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
}

export default function Navbar() {

    const { isAuth, setAuth, setToken, token } = useContext(AuthContext);
    const router = useRouter()
    const [userData, setUserData] = useState<userType>({})


    useEffect(() => {
        if (!isAuth)
            router.push('/auth/login')
        if (token) {
            setUserData(jwt_decode(token));
        }
    }, [isAuth, token, router])

    const handleLogout = () => {
        setAuth(false)
        setToken('')
        localStorage.removeItem('NotesApp')
        router.push('/auth/login')
    }


    return (
        <>
            <Box bg='#ff004c' px={4} position={'sticky'} top={0} zIndex={1000}>
                <Flex h={10} alignItems={'center'} justifyContent={'space-between'}>

                    <HStack spacing={8} alignItems={'center'}>
                        <Box color={'white'} as='b'>NotesApp</Box>

                    </HStack>
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <CgProfile color='white' size={25} />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>{userData?.firstName + ' ' + userData?.lastName}</MenuItem>
                                <MenuItem>{userData?.email} </MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

            </Box>
        </>
    );
}
