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
    }, [isAuth, token])

    const handleLogout = () => {
        setAuth(false)
        setToken('')
        localStorage.removeItem('NotesApp')
        router.push('/auth/login')
    }


    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

                    <HStack spacing={8} alignItems={'center'}>
                        <Box>Logo</Box>

                    </HStack>
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <CgProfile size={25} />
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
