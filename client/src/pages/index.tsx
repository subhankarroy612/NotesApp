import Navbar from "@/components/Navbar";
import SingleSection from "@/components/SingleSection";
import { Box, Button, Center, Flex, HStack, Image, Input, Text, useToast, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { MdOutlineAddBox } from 'react-icons/md';
import axios from 'axios';
import AuthContext from "@/contextAPI/AuthContext";
import styles from '../styles/Home.module.css'

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

export interface sectionType {
  createdAt?: string,
  sectionName?: string,
  updatedAt?: string,
  userId?: string,
  _id?: string
}

export default function Home() {

  const toast = useToast()
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

  const handleAddSection = () => {
    setSection(false)
    postSection(token, sectionName).then((r) => {
      if (r.status === 'success') {
        getSection(token)
          .then((r) => {
            setNumberOfSections(r.message)
          })
      }
    })
    setNumberOfSections([...numberOfSections, { sectionName }])
    setSectionName('')
  }

  const deleteSection = async (token: string | null, sectionId: string) => {
    try {
      let res = await axios.delete('/section/' + sectionId, {
        headers: {
          token
        }
      })
      if (res.data.status === 'success') {
        let section = numberOfSections.filter((ele) => ele._id !== sectionId)
        setNumberOfSections(section)
        toast({
          title: res.data.message,
          status: res.data.status,
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        })
      }
    } catch (e: any) {
      console.log(e.message);
    }
  }

  const sectionToggler = <Box w={'280px'} mr={1}>
    <Input
      w={'280px'}
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
      <Box
        p={12}
        minH={'95vh'}>
        <Text fontSize={'larger'} as={'b'}>Inbox</Text>

        {/* This will contain all the sections with task */}
        <Flex
          overflowY={'scroll'}
          gap={6}
          mt={8}
          minH={'75vh'}
          id={styles.container}
        >



          {/* Mapping the array which has the section names */}
          {
            numberOfSections && numberOfSections.map((ele: sectionType, i: number) => {
              return <SingleSection
                getSection={getSection}
                setNumberOfSections={setNumberOfSections}
                key={i}
                title={ele.sectionName}
                deleteSection={deleteSection}
                sectionId={ele._id} />
            })
          }

          {/* This the toogler section button */}

          <VStack>

            {section ? sectionToggler : <Button
              minW={'280px'}
              mr={1}
              onClick={() => setSection(true)}
              _hover={{ color: 'red' }}
              color={'gray'}
              size={'sm'}
              leftIcon={<MdOutlineAddBox size={18} />}
            >
              Add section
            </Button>}

            {
              !numberOfSections.length && <Box>
                <Box >
                  <Image src={'https://d3ptyyxy2at9ui.cloudfront.net/assets/images/d7c6fac19c896959feaaffd6472ca7a0.jpg'} alt={'empty img'} />
                  <Center>
                    <Text as={'b'}>What do you need to get done today?</Text>
                  </Center>
                  <Center>
                    <Text w={'280px'} color={'gray'} textAlign={'center'}>By default, tasks added here will be due today.</Text>
                  </Center>
                </Box>
              </Box>
            }
          </VStack>

        </Flex>



      </Box>
    </Box>
  )
}
