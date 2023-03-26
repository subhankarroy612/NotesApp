import AuthContext from '@/contextAPI/AuthContext'
import { Box, Button, Divider, Flex, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { MouseEvent, useContext, useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { RxCross1 } from 'react-icons/rx'
import { RiSendPlane2Fill } from 'react-icons/ri'
import { MdOutlineDelete } from 'react-icons/md'
import { RiDeleteBinFill } from 'react-icons/ri';

import axios from 'axios'

interface propType {
    title?: string,
    sectionId?: string,
    deleteSection: Function
}

interface taskType {
    taskName?: string,
    description?: string,
    sectionId?: string,
    _id?: string,
    createdAt?: string
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

const deleteTask = async (id: string | undefined, token: string | null) => {
    try {
        let res = await axios.delete('/task/' + id, {
            headers: {
                token
            }
        })
        return res.data
    } catch (e: any) {
        console.log(e.message);
    }
}

export default function SingleSection({ title, sectionId, deleteSection }: propType) {

    const { token } = useContext(AuthContext);
    const [task, setTask] = useState<boolean>(false)
    const [taskName, setTaskName] = useState<string | undefined>('')
    const [description, setDescription] = useState<string>('')
    const [allTask, setAllTask] = useState<taskType[]>([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [modalData, setModalData] = useState<taskType>({})
    const [modalTime, setModalTime] = useState<any>()

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

    const handleDeleteTask = (e: MouseEvent<SVGElement, globalThis.MouseEvent>, taskId: string | undefined) => {
        e.stopPropagation()
        deleteTask(taskId, token).then((r) => {
            if (r.status === 'success') {
                let task = allTask.filter((ele) => ele._id !== taskId)
                setAllTask(task)
            }
        })
    }

    const handleDeleteSection = () => {
        //this function is coming from index.tsx as the section array is there
        deleteSection(token, sectionId)

    }

    const handleModal = (taskData: taskType) => {
        onOpen()
        if (taskData.createdAt) {
            let store = new Date(taskData?.createdAt).toString().substring(0, 25)
            setModalTime(store)
        }
        setModalData(taskData)
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
            <Button isDisabled={!taskName} onClick={handleTask} bg={'red'} size={'sm'}><RiSendPlane2Fill color='white' /></Button>
        </Flex>
    </VStack>

    return (
        <Box w={'280px'} p={1} >
            {/* This is the modal for the task so that on click task expands */}
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modalData.taskName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text as={'i'} color={'gray'}>{modalData.description}</Text>

                        <Text mt={10}>Time: {modalTime}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


            <HStack justifyContent={'space-between'}>
                <Text fontSize={'md'} as={'b'}>{title}</Text>
                <RiDeleteBinFill onClick={handleDeleteSection} cursor={'pointer'} size={20} color={'gray'} />
            </HStack>

            {/* This is the container where all the tasks will be present */}
            <VStack spacing={2} mt={4}>
                {
                    allTask && allTask.map((ele, i) => {
                        return <Box key={i}
                            onClick={() => handleModal(ele)}
                            w={'full'}
                            cursor={'pointer'}
                            p={2}
                            borderRadius={8}
                            boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
                        >
                            <HStack justifyContent={'space-between'}>
                                <Text>{(ele.taskName)?.substring(0, 25)} ...</Text>
                                <HStack>
                                    <MdOutlineDelete onClick={(e) => handleDeleteTask(e, ele._id)} color={'red'} />
                                </HStack>
                            </HStack>
                            <Text fontSize={'xs'} color={'gray'}>{ele.description}</Text>
                        </Box>
                    })
                }
            </VStack>

            {/* This is the toggler button for adding task */}
            <Box w={'280px'}>
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
