import AuthContext from '@/contextAPI/AuthContext';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react';
import { auth, provider } from '../../firebase/config'
import { signInWithPopup } from 'firebase/auth'


interface dataType {
    email: string | undefined,
    password: string | undefined
}

const loginUser = async (data: dataType) => {
    try {
        let res = await axios.post('/user/login', data)
        return res.data
    } catch (e: any) {
        console.log(e.message);
    }
}

const googleLogin = async (firstName: string, email: string) => {
    try {
        const res = await axios.post('/user/googleLogin', { firstName, email })
        return res.data
    } catch (e: any) {
        console.log(e.message);
    }
}

export default function  SimpleCard() {

    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<dataType>({
        email: '',
        password: ''
    })
    const toast = useToast()
    const { isAuth, setAuth, setToken } = useContext(AuthContext);

    useEffect(() => {
        if (isAuth)
            router.push('/')
    }, [isAuth, router])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setLoading(true)
        loginUser(data)
            .then(r => {
                toast({
                    title: r.message,
                    status: r.status,
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right',
                })
                if (r.status === 'success') {
                    setAuth(true)
                    setToken(r.token)
                    localStorage.setItem('NotesApp', r.token)
                    router.push('/', undefined, { shallow: true })
                }
            })
            .catch(() => {
                toast({
                    title: 'Server error',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right',
                })
            })
            .finally(() => setLoading(false))
    }

    const handleGoogleLogin = () => {
        setLoading(true)
        signInWithPopup(auth, provider).then((data) => {
            const { displayName, email } = data.user;
            if (displayName && email) {
                googleLogin(displayName, email).then((r) => {
                    toast({
                        title: r.message,
                        status: r.status,
                        duration: 5000,
                        isClosable: true,
                        position: 'top-right',
                    })
                    if (r.status === 'success') {
                        setAuth(true)
                        setToken(r.token)
                        localStorage.setItem('NotesApp', r.token)
                        router.push('/', undefined, { shallow: true })
                    }
                }).catch(() => {
                    toast({
                        title: 'Server error',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                        position: 'top-right',
                    })
                })
            }
        })
            .finally(() => setLoading(false))
    }

    const { email, password } = data;

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Login to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input onChange={handleChange} name='email' value={email} type="email" />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input onChange={handleChange} name='password' value={password} type="password" />
                        </FormControl>
                        <Stack spacing={5}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Link color={'blue.400'}>Forgot password?</Link>
                            </Stack>
                            <Button
                                isLoading={loading}
                                loadingText="Submitting"
                                onClick={handleSubmit}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign in
                            </Button>
                            <Button
                                isLoading={loading}
                                loadingText="Submitting"
                                bg={'red'}
                                color={'white'}
                                onClick={handleGoogleLogin}
                            >
                                Sign in with Google
                            </Button>

                            <Text align={'center'}>
                                Don't have an account? <Link onClick={() => router.push('/auth/signup')} color={'blue.400'}>Signup</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
