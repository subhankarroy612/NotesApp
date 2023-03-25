import { Box, Button, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { IoMdAdd } from 'react-icons/io'

interface propType {
    title: string | undefined
}

export default function SingleSection({ title }: propType) {

    return (
        <Box w={'280px'} p={1} >
            <HStack justifyContent={'space-between'}>
                <Text fontSize={'md'} as={'b'}>{title}</Text>
                <BsThreeDots cursor={'pointer'} size={25} color={'gray'} />
            </HStack>
            <Button
                mt={5}
                _hover={{ color: 'red', bg: 'gray.100' }}
                leftIcon={<IoMdAdd size={20} />}
                variant={'ghost'} color={'gray'} size={'sm'}
            >
                Add task
            </Button>
        </Box>
    )
}
