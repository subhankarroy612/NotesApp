import Navbar from "@/components/Navbar";
import SingleSection from "@/components/SingleSection";
import { Box, Button, Flex, HStack, Input, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { MdOutlineAddBox } from 'react-icons/md';
import axios from 'axios';
import AuthContext from "@/contextAPI/AuthContext";

const postSection = async (token: string | null, sectionName: string) => {
  try {
    let res = await axios.post('/section', { sectionName }, {
      headers: {
        token
      }
    })
    return res.data
  } catch (e: any) {
    console.log(e.message);
  }
}

const getSection = async (token: string | null) => {
  try {
    let res = await axios('/section', {
      headers: {
        token
      }
    })
    return res.data
  } catch (e: any) {
    console.log(e.message);
  }
}

interface sectionType {
  createdAt?: string,
  sectionName?: string,
  updatedAt?: string,
  userId?: string,
  _id?: string
}

export default function Home() {

  const { token } = useContext(AuthContext)
  const [section, setSection] = useState<boolean>(false);
  const [sectionName, setSectionName] = useState<string>('');
  const [numberOfSections, setNumberOfSections] = useState<sectionType[]>([]);

  useEffect(() => {
    if (token)
      getSection(token)
        .then((r) => {
          setNumberOfSections(r.message)
        })
  }, [token])

  console.log(numberOfSections);


  const handleAddSection = () => {
    setSection(false)
    postSection(token, sectionName)
    setNumberOfSections([...numberOfSections, { sectionName }])
    setSectionName('')
  }

  const sectionToggler = <Box w={'280px'}>
    <Input
      onChange={(e) => setSectionName(e.target.value)}
      value={sectionName} borderColor={'gray'} placeholder="Name this section" />
    <HStack mt={3}>
      <Button isDisabled={!sectionName} onClick={handleAddSection} size={'sm'} bg={'red'} color={'white'}>Add section</Button>
      <Button onClick={() => setSection(false)} size={'sm'} variant={'ghost'}>Cancel</Button>
    </HStack>
  </Box>

  return (
    <Box>
      <Navbar />
      {/* this is the main home container */}
      <Box p={12} minH={'95vh'}>
        <Text fontSize={'larger'} as={'b'}>Inbox</Text>

        {/* This will contain all the sections with task */}
        <Flex gap={2} mt={8}>

          {/* Mapping the array which has the section names */}
          {
            numberOfSections && numberOfSections.map((ele: sectionType, i: number) => {
              return <SingleSection key={i} title={ele.sectionName} sectionId={ele._id} />
            })
          }

          {/* This the toogler section button */}
          {section ? sectionToggler : <Button
            onClick={() => setSection(true)}
            _hover={{ color: 'red' }}
            color={'gray'}
            size={'sm'}
            leftIcon={<MdOutlineAddBox size={18} />}
          >
            Add section
          </Button>}

        </Flex>

      </Box>
    </Box>
  )
}
