import { HStack, Input, Text, useToast } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import { RiDeleteBinFill } from 'react-icons/ri'
import { BiSave } from 'react-icons/bi'
import { FcCancel } from 'react-icons/fc'
import { FaRegEdit } from 'react-icons/fa'
import AuthContext from '@/contextAPI/AuthContext'
import axios from 'axios'
import { sectionType } from '@/pages'

interface propType {
    handleDeleteSection: Function,
    title?: string,
    sectionId?: string,
    getSection: Function,
    setNumberOfSections: Dispatch<SetStateAction<sectionType[]>>
}

const changeSectionName = async (sectionId: string, editedName: string, token: string) => {
    try {
        let res = await axios.post('/section/' + sectionId, { editedName }, {
            headers: {
                token
            }
        })
        return res.data
    } catch (e: any) {
        console.log(e.message);
    }
}

export default function EditSectionName({ handleDeleteSection, title, sectionId, getSection, setNumberOfSections }: propType) {

    const toast = useToast()
    const { token } = useContext(AuthContext)
    const [editSectionName, setEditSectionName] = useState<boolean>(false);
    const [editedName, setEditedName] = useState<string>('')

    const handleEditSectionName = () => {
        setEditSectionName(true)
    }

    const handleSectionName = () => {
        if (!editedName)
            return toast({
                title: 'Section name can not be empty!',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })

        if (sectionId && token) {
            setEditSectionName(false)
            changeSectionName(sectionId, editedName, token).then((r) => {
                if (r.status === 'success') {
                    getSection(token).then((r: { status: string, message: [] }) => {
                        setNumberOfSections(r.message)
                    })
                    return toast({
                        title: r.message,
                        status: r.status,
                        duration: 5000,
                        isClosable: true,
                        position: 'bottom',
                    })
                }
            })
                .finally(() => setEditedName(''))
        }
    }

    const editSectionNameToggler = <HStack h={'50px'} justifyContent={'space-between'}>
        <Input color={'gray'} onChange={(e) => setEditedName(e.target.value)} value={editedName} size={'sm'} placeholder='Edit section name' />
        <BiSave onClick={handleSectionName} cursor={'pointer'} size={20} color={'gray'} />
        <FcCancel onClick={() => setEditSectionName(false)} cursor={'pointer'} size={20} color={'gray'} />
    </HStack>

    if (editSectionName)
        return editSectionNameToggler
    return (
        <HStack h={'50px'} justifyContent={'space-between'}>
            <Text onClick={handleEditSectionName} w={'280px'} fontSize={'md'} as={'b'}>{(title)?.substring(0, 20)} {title && title?.length > 25 && '...'}</Text>
            <FaRegEdit onClick={() => setEditSectionName(true)} cursor={'pointer'} size={20} color={'gray'} />
            <RiDeleteBinFill onClick={() => handleDeleteSection(sectionId)} cursor={'pointer'} size={20} color={'gray'} />
        </HStack>
    )
}
