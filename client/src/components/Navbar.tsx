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
import { AddIcon } from '@chakra-ui/icons';
import { CgProfile } from 'react-icons/cg'
import { useContext, useEffect } from 'react';
import AuthContext from '@/contextAPI/AuthContext';
import { useRouter } from 'next/router';

export default function Navbar() {

    const { isAuth, setAuth, setToken } = useContext(AuthContext);
    const router = useRouter()

    useEffect(() => {
        if (!isAuth)
            router.push('/auth/login')
    }, [isAuth])

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
                        <Button
                            variant={'solid'}
                            colorScheme={'teal'}
                            size={'sm'}
                            mr={4}
                            leftIcon={<AddIcon />}
                        >
                            Action
                        </Button>
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
                                <MenuItem>Link 1</MenuItem>
                                <MenuItem>Link 2</MenuItem>
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