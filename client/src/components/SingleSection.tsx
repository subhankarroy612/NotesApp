import AuthContext from '@/contextAPI/AuthContext'
import { Box, Button, Divider, Flex, HStack, Input, Text, VStack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { IoMdAdd } from 'react-icons/io'
import { RxCross1 } from 'react-icons/rx'
import { RiSendPlane2Fill } from 'react-icons/ri'
import { MdOutlineDelete } from 'react-icons/md'
import axios from 'axios'

interface propType {
    title?: string,
    sectionId?: string
}

interface taskType {
    taskName?: string,
    description?: string,
    sectionId?: string,
    _id?: string
}

interface postTaskProp extends taskType {
    token: string
}

const postTask = async ({ taskName, description, sectionId, token }: postTaskProp) => {
    try {

        let res = await axios.post('/task/postTask', { taskName, description, sectionId }, {
            headers: {
                token
            }
        })
        return res.data
    } catch (e: any) {
        console.log(e.message);
    }
}

const getTask = async (token: string, sectionId: string) => {
    try {
        let res = await axios.post('/task/getTask', { sectionId }, {
            headers: {
                token
            }
        })
        return res.data
    } catch (e: any) {
        console.log(e.message);
    }
}

export default function SingleSection({ title, sectionId }: propType) {

    const { token } = useContext(AuthContext);
    const [task, setTask] = useState<boolean>(false)
    const [taskName, setTaskName] = useState<string | undefined>('')
    const [description, setDescription] = useState<string>('')
    const [allTask, setAllTask] = useState<taskType[]>([])

    useEffect(() => {
        if (token && sectionId) {
            getTask(token, sectionId).then((r) => {
                setAllTask(r.message);
            })
        }
    }, [])

    const handleTask = () => {
        setTask(false)
        if (token) {
            postTask({ taskName, description, sectionId, token }).then((r) => {
                console.log(r);
                if (r.status === 'success') {
                    if (token && sectionId) {
                        getTask(token, sectionId).then((r) => {
                            setAllTask(r.message);
                        })
                    }
                }
            })
        }
        setTaskName('')
        setDescription('')
    }

    const handleDelete = (taskId: string | undefined) => {
           console.log(taskId);
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

            {/* This is the container where all the tasks will be present */}
            <VStack spacing={2} mt={4}>
                {
                    allTask && allTask.map((ele, i) => {
                        return <Box key={i}
                            w={'full'}
                            cursor={'pointer'}
                            p={2}
                            borderRadius={8}
                            boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
                        >
                            <HStack justifyContent={'space-between'}>
                                <Text>{ele.taskName}</Text>
                                <HStack>
                                    <MdOutlineDelete onClick={() => handleDelete(ele._id)} color={'red'} />
                                </HStack>
                            </HStack>
                            <Text fontSize={'xs'} color={'gray'}>{ele.description}</Text>
                        </Box>
                    })
                }
            </VStack>

            {/* This is the toggler button for adding task */}
            <Box>
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

        </Box>
    )
}
