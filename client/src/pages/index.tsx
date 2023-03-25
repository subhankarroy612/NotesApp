import Navbar from "@/components/Navbar";
import SingleSection from "@/components/SingleSection";
import { Box, Button, Flex, HStack, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineAddBox } from 'react-icons/md'

export default function Home() {

  const [section, setSection] = useState<boolean>(false)
  const [sectionName, setSectionName] = useState<string>('')
  const [numberOfSections, setNumberOfSections] = useState<string[]>([])

  const handleAddSection = () => {
    setSection(false)
    setNumberOfSections([...numberOfSections, sectionName])
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
            numberOfSections.map((ele, i) => {
              return <SingleSection key={i} title={ele} />
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
