import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import axios from 'axios'
import AuthContext from '@/contextAPI/AuthContext';

interface dataType {
  firstName: string | undefined,
  lastName: string | undefined,
  email: string | undefined,
  password: string | undefined
}

const signupUser = async (data: dataType) => {
  try {
    let res = await axios.post('/user/signup', data)
    return res.data
  } catch (e: any) {
    console.log(e.message);
  }
}


export default function Signup() {
  const toast = useToast()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<dataType>({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const { isAuth } = useContext(AuthContext);

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
    signupUser(data).then(r => {
      toast({
        title: r.message,
        status: r.status,
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      })
      if (r.status === 'success') return router.push('/auth/login')

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


  const { firstName, lastName, email, password } = data;
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input value={firstName} name={'firstName'} onChange={handleChange} type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input value={lastName} name={'lastName'} onChange={handleChange} type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input value={email} name={'email'} onChange={handleChange} type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input value={password} name={'password'} onChange={handleChange} type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                isLoading={loading}
                onClick={handleSubmit}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link onClick={() => router.push('/auth/login')} color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}