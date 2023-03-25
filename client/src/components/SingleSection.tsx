import AuthContext from '@/contextAPI/AuthContext'
import { Box, Button, Divider, Flex, HStack, Input, Text, VStack } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { IoMdAdd } from 'react-icons/io'
import { RxCross1 } from 'react-icons/rx'
import { RiSendPlane2Fill } from 'react-icons/ri'

interface propType {
    title?: string,
    sectionId?: string
}

export default function SingleSection({ title, sectionId }: propType) {

    const { token } = useContext(AuthContext);
    const [task, setTask] = useState<boolean>(false)
    const [taskName, setTaskName] = useState<string | undefined>('')
    const [description, setDescription] = useState<string>('')


    const handleTask = () => {
        setTask(false)
        console.log(taskName, description, sectionId);
        setTaskName('')
        setDescription('')
    }


    const taskToggler = <VStack
        mt={5}
        borderRadius={8}
        border={'1px solid black'}
        p={3}
        position={'relative'}
    >
        <Input value={taskName} onChange={(e) => setTaskName(e.target.value)} border={'none'} fontWeight={'bold'} variant={'unstyled'} size={'sm'} placeholder='Task name' />
        <Input value={description} onChange={(e) => setDescription(e.target.value)} size={'sm'} variant={'unstyled'} placeholder='Description' />
        <Divider borderColor={'gray.200'} />
        <Flex w={'full'} gap={1} justifyContent={'flex-end'} alignItems={'flex-end'} >
            <Button onClick={() => setTask(false)} size={'sm'}><RxCross1 /></Button>
            <Button onClick={handleTask} bg={'red'} size={'sm'}><RiSendPlane2Fill color='white' /></Button>
        </Flex>
    </VStack>

    return (
        <Box w={'280px'} p={1} >
            <HStack justifyContent={'space-between'}>
                <Text fontSize={'md'} as={'b'}>{title}</Text>
                <BsThreeDots cursor={'pointer'} size={25} color={'gray'} />
            </HStack>

            {task ? taskToggler : <Button
                onClick={() => setTask(true)}
                mt={5}
                _hover={{ color: 'red', bg: 'gray.100' }}
                leftIcon={<IoMdAdd size={20} />}
                variant={'ghost'} color={'gray'} size={'sm'}
            >
                Add task
            </Button>}

        </Box>
    )
}
